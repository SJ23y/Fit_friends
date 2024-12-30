import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AUTH_GUARD_CHECK_URL, User } from '@backend/shared-core'

export class AuthCheckGuard implements CanActivate {
  private readonly httpService = new HttpService()

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const { data } = await this.httpService.axiosRef.post<User>(AUTH_GUARD_CHECK_URL, {}, {
        headers: {
          Authorization: request.headers['authorization']
        }
      });


      request['user'] = {...data}

      return true;
    } catch {
      throw new UnauthorizedException('Unauthorised')
    }
  }
}
