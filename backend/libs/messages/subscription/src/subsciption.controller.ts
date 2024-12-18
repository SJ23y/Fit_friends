import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload } from '@backend/shared-core';
import { SubscriptionService } from './subscription.service';
import { SubscriptionInfoMessages } from './subscription.consts';
import { SubscriptionDto } from './dto/subscription.dto';
import { JwtAuthGuard } from '@backend/authentication';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  private logger = new Logger('Subscription controller');

  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {}

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: SubscriptionInfoMessages.Created
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SubscriptionInfoMessages.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: SubscriptionInfoMessages.Conflict
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: SubscriptionInfoMessages.Unauthorized
  })
  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(
    @Body() dto: SubscriptionDto, @Req() {user}: RequestWithTokenPayload) {
    await this.subscriptionService.saveSubscription(dto, user);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: SubscriptionInfoMessages.Deleted
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SubscriptionInfoMessages.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: SubscriptionInfoMessages.NoSubscription
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: SubscriptionInfoMessages.Unauthorized
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:subscriberToId')
  public async delete(@Param('subscriberToId', ParseUUIDPipe) subscriberToId: string, @Req() {user}: RequestWithTokenPayload) {
    await this.subscriptionService.deleteSubscription(user.sub, subscriberToId);
  }
}
