import { Body, Controller, FileTypeValidator, Get, HttpStatus, Param, ParseFilePipe, ParseUUIDPipe, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from './training.service';
import { TrainingQuery } from './training.query';
import { TrainingsWithPaginationRdo } from './rdo/trainings-with-pagination.rdo';
import { TrainingRdo } from './rdo/training.rdo';
import { fillDto } from '@backend/shared-helpers';
import { JwtAuthGuard } from '@backend/authentication';
import { RequestWithTokenPayload } from '@backend/shared-core';
import { CreateTrainingDto } from './dto/create-training.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTrainingDto } from './dto/update-training.dto';

@ApiTags('Training')
@Controller('trainings')
export class TrainingController {

  constructor(
    private readonly trainingService: TrainingService
   ) {}


   @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Успешно создана новая тренировка'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Данное действие доступно только тренерам'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Данное действие доступно только авторизованным пользователям'
  })
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(
    @Body() dto: CreateTrainingDto,
    @Req() {user}: RequestWithTokenPayload,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(mov|avi|mp4|quicktime)' }),
      ],
      fileIsRequired: false})) file: Express.Multer.File) {

    const newTraining = await this.trainingService.createTraining(dto, user, file);
    return fillDto(TrainingRdo, newTraining);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Предоставляет список тренировок'
  })
  @UseGuards(JwtAuthGuard)
  @Get('')
  public async index(@Req() { user }: RequestWithTokenPayload, @Query() query?: TrainingQuery) {
    const paginationResult = await this.trainingService.getAllTrainings(user.sub, query);

    return fillDto(TrainingsWithPaginationRdo, paginationResult);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Предоставляет информацию о конкректной тренировке'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Тренировка с указаным ID не найдена'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Данная информация доступна только авторизованным пользователям'
  })
  @Get('/:trainingId')
  @UseGuards(JwtAuthGuard)
  public async show(@Param('trainingId', ParseUUIDPipe) trainingId: string) {
    const currentTraining = await this.trainingService.getTraining(trainingId);

    return fillDto(TrainingRdo, currentTraining);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Тренировка успешно обновлена'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Тренировка с указанным id не найдена'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Данное действие вам не доступно'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Данное действие доступно только авторизованным пользователям'
  })
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(JwtAuthGuard)
  @Post('/update/:trainingId')
  public async update(
    @Body() dto: UpdateTrainingDto,
    @Req() {user}: RequestWithTokenPayload,
    @Param('trainingId', ParseUUIDPipe) trainingId: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(mov|avi|mp4|MOV|quicktime)' }),
      ],
      fileIsRequired: false})) file: Express.Multer.File) {

    console.log('file', file);
    const newTraining = await this.trainingService.updateTraining(trainingId, dto, user, file);
    return fillDto(TrainingRdo, newTraining);
  }


}
