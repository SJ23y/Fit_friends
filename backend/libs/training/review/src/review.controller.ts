import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { ReviewQuery } from './review.query';
import { ReviewsWithPaginationRdo } from './rdo/reviews-with-pagination.rdo';
import { ReviewRdo } from './rdo/review.rdo';
import { fillDto } from '@backend/shared-helpers';
import { JwtAuthGuard } from '@backend/authentication';
import { CreateReviewDto } from './dto/create-review.dto';
import { TrainingService } from '@backend/training';
import { RequestWithTokenPayload } from '@backend/shared-core';


@ApiTags('review')
@Controller('reviews')
export class ReviewController {

  constructor(
    private readonly reviewService: ReviewService,
    private readonly trainingService: TrainingService
   ) {}

   @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Добавляет новый отзыв'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Тренировка с указаным ID не найдена'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Данный ресурс доступен только авторизованным пользователям'
  })
  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(@Body() dto: CreateReviewDto, @Req() { user }: RequestWithTokenPayload) {
    const [newReview,] = await Promise.all([
      this.reviewService.createReview(dto, user?.sub),
      this.trainingService.updateTrainingRating(dto.trainId, dto.rate)
    ]);

    return fillDto(ReviewRdo, newReview);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Предоставляет список отзывов'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Тренировка с указаным ID не найдена'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Данная информация доступна только авторизованным пользователям'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:trainingId')
  public async index(@Param('trainingId', ParseUUIDPipe) trainingId: string, @Query() query?: ReviewQuery) {
    const paginationResult = await this.reviewService.getAllTrainingReviews(trainingId, query);

    return fillDto(ReviewsWithPaginationRdo, paginationResult);
  }
}
