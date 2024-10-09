import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AUTH_GUARD_CHECK_URL } from '@backend/shared-core'

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(AUTH_GUARD_CHECK_URL, {}, {
      headers: {
        Authorization: request.headers['authorization']
      }
    });
    request['user'] = data;

    return true;
  }
}
