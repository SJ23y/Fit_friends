import 'multer';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@backend/shared-helpers';
import { RequestWithTokenPayload } from '@backend/shared-core';
import { NotificationRdo } from './rdo/notification.rdo';
import { JwtAuthGuard } from '@backend/authentication';
import { NotificationService } from './notification.service';
import { NotificationInfoMessages } from './notification.consts';

@ApiTags('notification')
@Controller('notifications')
export class NotificationController {

  constructor(
    private readonly notificatinService: NotificationService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: NotificationInfoMessages.SUCCESS
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NotificationInfoMessages.UNAUTHORIZED
  })
  @UseGuards(JwtAuthGuard)
  @Get('')
  public async index(@Req() {user}: RequestWithTokenPayload)  {
    const notifications = await this.notificatinService.getNotifications(user.sub);
    return fillDto(NotificationRdo, notifications.map((notification) => notification.toPOJO()));
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: NotificationInfoMessages.DELETED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NotificationInfoMessages.UNAUTHORIZED
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: NotificationInfoMessages.WRONG_USER
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: NotificationInfoMessages.NOT_FOUND
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:notificationId')
  public async delete(@Param('notificationId', ParseUUIDPipe) notificationId: string,@Req() {user}: RequestWithTokenPayload)  {
    await this.notificatinService.deleteNotification(notificationId, user.sub);
  }
}
