import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserQuery, UserRepository } from '@backend/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, AUTH_USER_UNAUTHORISED } from './authentication.consts';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CoachQuestionnarie, DEFAULT_AVATAR_NAMES, DEFAULT_BACKGROUND_IMAGE_NAMES, DefaultQuestionnaireMan, DefaultQuestionnaireWoman, Gender, PaginationResult, Role, Token, TokenPayload, User, UserQuestionnarie } from '@backend/shared-core';
import { jwtConfig } from '@backend/user-config';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { createJwtPayload, fillDto, getRanndomElement } from '@backend/shared-helpers';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FileManagerService } from '@backend/file-manager';
import { QustionnaireRdo } from '../rdo/questionnaire.rdo';

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
      avatar: avatar?.replace(/\\/g, '/') ?? getRanndomElement(DEFAULT_AVATAR_NAMES),
      backgroundImage: getRanndomElement(DEFAULT_BACKGROUND_IMAGE_NAMES),
      birthDate: dto.birthDate ?? '',
      passwordHash: '',
      trainigs: undefined,
      reviews: undefined,
      purchaces: undefined
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

    if (! existUser.questionnaire) {
      existUser.questionnaire = (existUser.gender === Gender.FEMALE && existUser.role === Role.USER) ? DefaultQuestionnaireWoman : DefaultQuestionnaireMan;
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!existUser.questionnaire) {
      existUser.questionnaire = (existUser.gender === Gender.FEMALE && existUser.role === Role.USER) ? DefaultQuestionnaireWoman : DefaultQuestionnaireMan;
    }

    return existUser;
  }

  public async update(dto: UpdateUserDto, file: Express.Multer.File, id?: string) {
    if (!id) {
      throw new UnauthorizedException(AUTH_USER_UNAUTHORISED)
    }

    const existUser = await this.userRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const avatar = await this.fileService.writeFile(file, existUser.avatar);

    dto.avatar = avatar?.replace(/\\/g, '/') ?? undefined;

    const questionnaire = dto?.questionnaire ?? fillDto(QustionnaireRdo, dto) as UserQuestionnarie | CoachQuestionnarie;

    const updatedUser = await this.userRepository.update(
      id,
      {
        ...existUser.toPOJO(),
        ...dto,
        questionnaire: {
          ...questionnaire
        }
      });
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

  public async getAllUsers(userPayload: TokenPayload, query?: UserQuery): Promise<PaginationResult<UserEntity>> {
    if (userPayload.role === Role.COACH) {
      throw new ConflictException('This kind of information not allowed for the coaches');
    }

    const paginatedUsers = this.userRepository.getUsers(userPayload.sub, query);

    return paginatedUsers;
  }

  public async updateSertificates(user: TokenPayload, file?: Express.Multer.File, formerFilePath?: string): Promise<string | undefined> {
    if (user.role === Role.USER) {
      throw new ConflictException('This kind of information not allowed for you');
    }

    const newSertificate = await this.fileService.writeFile(file);

    const existUser = await this.userRepository.findById(user.sub);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    let sertificates = (existUser.sertificates) ? [...existUser.sertificates] : [];

    if (newSertificate) {
      sertificates.push(newSertificate.replace(/\\/g, '/'));
    }

    if (formerFilePath) {
      await this.fileService.deleteFile(formerFilePath);
      console.log('formerFilePath: ',formerFilePath );
      console.log(sertificates);
      sertificates = sertificates.filter((sertificate) => sertificate !== formerFilePath);
      console.log('filtered sertificates: ', sertificates);
    }

   await this.userRepository.update(
      user.sub,
      {
        ...existUser.toPOJO(),
        questionnaire: fillDto(QustionnaireRdo, existUser.questionnaire) as UserQuestionnarie | CoachQuestionnarie,
        sertificates: sertificates
      });
      return newSertificate?.replace(/\\/g, '/');
  }
}
