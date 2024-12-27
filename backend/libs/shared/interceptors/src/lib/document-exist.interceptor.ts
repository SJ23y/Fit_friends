import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiRoute } from '@backend/shared-core';

@Injectable()
export class DocumentExistInterceptor implements NestInterceptor {
  private readonly httpService = new HttpService()

  constructor(
    private readonly entityType: string,
    private readonly paramName: string
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler<unknown>): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();
    const documentId = request.params[this.paramName];
    console.log('Check url',`${ApiRoute[this.entityType]}/${documentId}`)
    const { data } = await this.httpService.axiosRef.get(`${ApiRoute[this.entityType]}/${documentId}`,{
      headers: {
        Authorization: request.headers['authorization']
      }
    });;

    if (! data) {
      throw new NotFoundException(`[DocumentExistInterceptor] document with ${documentId} not found`);
    }

    request['existedEntity'] = data;

    return next.handle();
  }
}
