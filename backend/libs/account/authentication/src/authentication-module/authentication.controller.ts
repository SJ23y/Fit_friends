import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards } from '@nestjs/common';
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
import { TrainingBalanceService } from '@backend/user-balance';
import { UserBalanceRdo } from '../rdo/user-balance.rdo';

@ApiTags('authentication')
@Controller('')
export class AuthenticationController {
  private logger = new Logger('Authentication controller');

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userBalanceservice: TrainingBalanceService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationMessages.UserCreated
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessages.UserExist
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.authenticationService.register(dto);
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
    if (! user) {
      throw new BadRequestException('User not found');
    }
    const userToken = await this.authenticationService.createUserToken(user);

    return fillDto(LoggedUserRdo, {...user.toPOJO(), ...userToken});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationMessages.PasswordUpdated
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
  @Patch('user/update')
  public async update(@Body() dto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload) {
    const user = await this.authenticationService.update(dto, payload?.sub);

    return fillDto(UserRdo, user.toPOJO());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationMessages.UserFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationMessages.UserNotFound
  })
  @UseGuards(JwtAuthGuard)
  @Get('user/balance/:id')
  public async showUserBalance(@Param('id', ParseUUIDPipe) id: string) {
    const totalTrainingsCount = await this.userBalanceservice.getUserTrainingsCount(id);
    return fillDto(UserBalanceRdo, { totalTrainingsCount })
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
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
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
}
