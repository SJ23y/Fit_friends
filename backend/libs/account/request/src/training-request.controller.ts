import 'multer';
import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload } from '@backend/shared-core';
import { TrainingRequestService } from './training-request.service';
import { JwtAuthGuard } from '@backend/authentication';
import { RequestsMessages } from './training-request.conts';
import { TrainingRequestDto } from './dto/training-request-dto';

@ApiTags('Training requests')
@Controller('requests')
export class TrainingRequestController {
  private logger = new Logger('Friends controller');

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
  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(@Body() {senderId, recieverId, status}: TrainingRequestDto, @Req() {user}: RequestWithTokenPayload) {
    await this.requetsService.saveRequest(user, senderId, recieverId, status);
  }
}
