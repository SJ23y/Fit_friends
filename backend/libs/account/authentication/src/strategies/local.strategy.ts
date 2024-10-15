import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication-module/authentication.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@backend/shared-core';
import { validate } from 'class-validator';
import { LoginUserDto } from '../dto/login-user.dto';
import { plainToInstance } from 'class-transformer';


const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthenticationService
  ) {
    super({usernameField: USERNAME_FIELD_NAME});
  }

  public async validate(email: string, password: string): Promise<User> {
    const dtoInstance = plainToInstance(LoginUserDto,  {email, password});
    const errors = await validate(dtoInstance);
   if (errors.length > 0) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Bad request',
        message: errors.reduce((aggregator, error) => ([...aggregator, ...Object.values(<Record<string,string>>error.constraints)]), <string[]>[])
      }, HttpStatus.BAD_REQUEST, {
        cause: errors
      });
   }
   return this.authService.verify({email, password});
  }
}
