import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@backend/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, AUTH_USER_UNAUTHORISED } from './authentication.consts';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@backend/shared-core';
import { jwtConfig } from '@backend/user-config';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { createJwtPayload } from '@backend/shared-helpers';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly refsreshTokenService: RefreshTokenService,
    private readonly userRepository: UserRepository,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {
  }

  public async register(dto: CreateUserDto) {
    const newUser = {
      ...dto,
      avatar: dto.avatar ?? '',
      birthDate: dto.birthDate ?? '',
      passwordHash: ''
    }
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXIST);
    }

    const userEntity = await new UserEntity(newUser).setPassword(dto.password);
    await this.userRepository.save(userEntity);
    return userEntity;
  }

  public async verify({ email, password }: LoginUserDto) {
    const existUser = await this.userRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (! await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return existUser;
  }

  public async update( dto: UpdateUserDto, id?: string,) {
    if (!id) {
      throw new UnauthorizedException(AUTH_USER_UNAUTHORISED)
    }

    const existUser = await this.userRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const updatedUser = await this.userRepository.update(id, {...existUser.toPOJO(), ...dto });
    return updatedUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessPayload = createJwtPayload(user);
    const refreshPayload = { ...accessPayload, tokenId: randomUUID() }

    await this.refsreshTokenService.createRefreshToken(refreshPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessPayload);
      const refreshToken = await this.jwtService.signAsync(refreshPayload, {
        secret: this.jwtOptions.jwtRefreshTokenSecret,
        expiresIn: this.jwtOptions.jwtRefreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch(error) {
      this.logger.error(`[Token generation error]: ${ error }`);
      throw new HttpException('Ошибка при создании токена', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
