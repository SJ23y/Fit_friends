import { Controller, Get, HttpStatus, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from './training.service';
import { TrainingQuery } from './training.query';
import { TrainingsWithPaginationRdo } from './rdo/trainings-with-pagination.rdo';
import { TrainingRdo } from './rdo/training.rdo';
import { fillDto } from '@backend/shared-helpers';
import { JwtAuthGuard } from '@backend/authentication';

@ApiTags('Training')
@Controller('trainings')
export class TrainingController {

  constructor(
    private readonly trainingService: TrainingService
   ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Предоставляет список тренировок'
  })
  @Get('')
  public async index(@Query() query?: TrainingQuery) {
    const paginationResult = await this.trainingService.getAllTrainings(query);

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



}
