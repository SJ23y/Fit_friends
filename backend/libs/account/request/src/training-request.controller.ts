import 'multer';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithUserPayload } from '@backend/shared-core';
import { TrainingRequestService } from './training-request.service';
import { RequestsMessages } from './training-request.conts';
import { TrainingRequestDto } from './dto/training-request-dto';
import { AuthCheckGuard } from '@backend/shared-guards';

@ApiTags('Training requests')
@Controller('requests')
export class TrainingRequestController {
  constructor(
    private readonly requetsService: TrainingRequestService
  ) {}

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: RequestsMessages.Success
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: RequestsMessages.Unauthorized
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: RequestsMessages.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: RequestsMessages.IsCoach
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: RequestsMessages.IsNotUUID
  })
  @UseGuards(AuthCheckGuard)
  @Post('')
  public async create(@Body() {senderId, recieverId, status}: TrainingRequestDto, @Req() {user}: RequestWithUserPayload) {
    await this.requetsService.saveRequest(user, senderId, recieverId, status);
  }
}
