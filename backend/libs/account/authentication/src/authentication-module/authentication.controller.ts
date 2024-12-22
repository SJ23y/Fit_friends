import 'multer';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationMessages } from './authentication.consts';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { fillDto } from '@backend/shared-helpers';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { LoacalAuthGuard } from '../guards/local-auth.quard';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RequestWithTokenPayload } from '@backend/shared-core';
import { UserRdo } from '../rdo/user.rdo';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserQuery } from '@backend/user';
import { UserWithPaginationRdo } from '../rdo/user-with-pagination.rdo';
import { SertificateDto } from '../dto/sertificate.dto';

@ApiTags('authentication')
@Controller('')
export class AuthenticationController {
  private logger = new Logger('Authentication controller');

  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationMessages.UserCreated
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessages.UserExist
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false
      }),
    ) file: Express.Multer.File) {
    const user = await this.authenticationService.register(dto, file);
    return fillDto(UserRdo, user.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationMessages.UserCreated
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationMessages.UserFound
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.Unauthorized
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(JwtAuthGuard)
  @Post('user/update')
  public async update(
    @Body() dto: UpdateUserDto,
    @Req() {user:payload}: RequestWithTokenPayload,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false
      }),
    ) file: Express.Multer.File) {
    console.log('UpdateUserDto', dto);
    console.log('file', file);
    const user = await this.authenticationService.update(dto, file, payload.sub);
    return fillDto(UserRdo, user.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationMessages.LoggedSuccess
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.LoggedError
  })
  @UseGuards(LoacalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {

    const userToken = await this.authenticationService.createUserToken(user);

    return fillDto(LoggedUserRdo, {...user.toPOJO(), ...userToken});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationMessages.RefreshTokens
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.WrongToken
  })
  @UseGuards(JwtRefreshGuard)
  @Post('auth/refresh')
  public async refreshToken(@Req() {user}: RequestWithUser) {
    return this.authenticationService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/check')
  public async checkToken(@Req() {user: payload}: RequestWithTokenPayload) {
    const user = await this.authenticationService.getUser(payload.sub);

    return  fillDto(UserRdo, user.toPOJO());;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AuthenticationMessages.UserLogout
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.Unauthorized
  })
  @UseGuards(JwtRefreshGuard)
  @Delete('logout')
  public async logout() {
    this.logger.log('Refresh token was deleted');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationMessages.UserFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationMessages.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.Unauthorized
  })
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  public async show(@Param('userId') userId: string) {
    const user = await this.authenticationService.getUser(userId);
    console.log('User', user);
    return fillDto(UserRdo, user.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationMessages.UserList
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessages.NotForCoach
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.Unauthorized
  })
  @UseGuards(JwtAuthGuard)
  @Get('user')
  public async index(@Req() {user:payload}: RequestWithTokenPayload, @Query() query?: UserQuery) {
    const users = await this.authenticationService.getAllUsers(payload, query);
    return fillDto(UserWithPaginationRdo, users);
  }

  /*
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationMessages.SertificateSaved
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessages.NotForCoach
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.Unauthorized
  })
  @UseInterceptors(FileInterceptor('sertificate'))
  @UseGuards(JwtAuthGuard)
  @Post('sertificate/upload')
  public async uploadSertificate(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.pdf' })
        ],
        fileIsRequired: false
      }),
    ) file: Express.Multer.File,
    @Req() {user}: RequestWithTokenPayload) {
    const newFilePath = await this.authenticationService.updateSertificates(user, file);
    return newFilePath;
  }*/

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationMessages.SertificateUpdated
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessages.NotForCoach
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.Unauthorized
  })
  @UseInterceptors(FileInterceptor('sertificate'))
  @UseGuards(JwtAuthGuard)
  @Post('sertificate/upload')
  public async updateSertificate(
    @Body() { path }: SertificateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.pdf' })
        ],
        fileIsRequired: false
      }),
    ) file: Express.Multer.File,
    @Req() {user}: RequestWithTokenPayload) {
    const newFilePath = await this.authenticationService.updateSertificates(user, file, path);
    return newFilePath;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AuthenticationMessages.SertificateDeleted
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessages.NotForCoach
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.Unauthorized
  })
  @UseGuards(JwtAuthGuard)
  @Post('sertificate/delete')
  public async deleteSertificate(@Body() dto: SertificateDto, @Req() {user}: RequestWithTokenPayload) {
    console.log('sertificate delete', [user, undefined, dto]);
    await this.authenticationService.updateSertificates(user, undefined, dto.path);
  }
}
