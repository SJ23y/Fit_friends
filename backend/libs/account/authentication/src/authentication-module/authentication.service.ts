import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@backend/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, AUTH_USER_UNAUTHORISED } from './authentication.consts';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DEFAULT_AVATAR_NAMES, DEFAULT_BACKGROUND_IMAGE_NAMES, DefaultQuestionnaireMan, DefaultQuestionnaireWoman, Gender, Role, Token, User } from '@backend/shared-core';
import { jwtConfig } from '@backend/user-config';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { createJwtPayload, getRanndomElement } from '@backend/shared-helpers';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserWithFiles } from './user-with-files.interface';
import { FileManagerService } from '@backend/file-manager';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly refsreshTokenService: RefreshTokenService,
    private readonly userRepository: UserRepository,
    private readonly fileService: FileManagerService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {
  }

  public async register(dto: CreateUserDto, file: Express.Multer.File) {
    const avatar = await this.fileService.writeFile(file);

    const newUser = {
      ...dto,
      description: '',
      avatar: avatar ?? getRanndomElement(DEFAULT_AVATAR_NAMES),
      backgroundImage: getRanndomElement(DEFAULT_BACKGROUND_IMAGE_NAMES),
      birthDate: dto.birthDate ?? '',
      passwordHash: '',
      trainigs: undefined,
      reviews: undefined,
      purchaces: undefined,
      role: Role.USER
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

    if (!existUser.questionnaire) {
      existUser.questionnaire = (existUser.gender === Gender.FEMALE) ? DefaultQuestionnaireWoman : DefaultQuestionnaireMan;
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!existUser.questionnaire) {
      existUser.questionnaire = (existUser.gender === Gender.FEMALE) ? DefaultQuestionnaireWoman : DefaultQuestionnaireMan;
    }

    return existUser;
  }

  public async update( dto: UpdateUserDto, files: UserWithFiles, id?: string,) {
    if (!id) {
      throw new UnauthorizedException(AUTH_USER_UNAUTHORISED)
    }

    const [avatar, backgroundImage] = await Promise.all([
      this.fileService.writeFile(files.avatar?.[0]),
      this.fileService.writeFile(files.backgroundImage?.[0])
    ]);
    dto.avatar = avatar ?? undefined;
    dto.backgroundImage = backgroundImage ?? undefined;

    const existUser = await this.userRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const updatedUser = await this.userRepository.update(id, {...existUser.toPOJO(), ...dto });
    if (!updatedUser.questionnaire) {
      updatedUser.questionnaire = (updatedUser.gender === Gender.FEMALE) ? DefaultQuestionnaireWoman : DefaultQuestionnaireMan;
    }
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
