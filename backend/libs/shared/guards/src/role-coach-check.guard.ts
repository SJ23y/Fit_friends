import { HttpService } from '@nestjs/axios';
import { CanActivate, ConflictException, ExecutionContext } from '@nestjs/common';
import { AUTH_GUARD_CHECK_URL, Role, User } from '@backend/shared-core'

export class RoleCoachCheckGuard implements CanActivate {
  private readonly httpService = new HttpService()

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post<User>(AUTH_GUARD_CHECK_URL, {}, {
      headers: {
        Authorization: request.headers['authorization']
      }
    });

    if (data.role !== Role.COACH) {
      throw new ConflictException('Данное действие доступно только тренерам');
    }

    request['user'] = {sub: data.id}

    return true;
  }
}
