import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PurchaseService } from './purchase.service';
import { PurchaseQuery } from './purchase.query';
import { PurchasesWithPaginationRdo } from './rdo/purchases-with-pagination.rdo';
import { PurchaseRdo } from './rdo/purchase.rdo';
import { fillDto } from '@backend/shared-helpers';
import { JwtAuthGuard } from '@backend/authentication';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ReduceTrainingsDto } from './dto/reduce-trainings.dto';
import { RequestWithTokenPayload } from '@backend/shared-core';
import { OrdersWithPaginationRdo } from './rdo/orders-with-pagination.rdo';
import { RoleCoachCheckGuard } from '@backend/shared-guards';


@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {

  constructor(
    private readonly purchaseService: PurchaseService
   ) {}

   @ApiResponse({
    type: PurchaseRdo,
    status: HttpStatus.CREATED,
    description: 'Данные о покупке сохранены'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Данная информация доступна только авторизованным пользователям'
  })
  @Post('')
  @UseGuards(JwtAuthGuard)
  public async create(@Body() purchaseDto: CreatePurchaseDto, @Req() { user }: RequestWithTokenPayload) {
    const purchase = await this.purchaseService.createPurchase(purchaseDto, user?.sub);

    return fillDto(PurchaseRdo, purchase);
  }

  @ApiResponse({
    type: PurchasesWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Предоставляет список тренировок'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  public async getUserPurchases(@Req() { user }: RequestWithTokenPayload, @Query() query?: PurchaseQuery) {
    const paginationResult = await this.purchaseService.getUserPurchases(user?.sub, query);

    return fillDto(PurchasesWithPaginationRdo, paginationResult);
  }

  @ApiResponse({
    type: PurchasesWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Предоставляет список заказов'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Данная информация доступна только авторизованным пользователям'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Данная информация доступна только тренерам'
  })
  @UseGuards(RoleCoachCheckGuard)
  @Get('/orders')
  public async getCoachOrders(@Req() { user }: RequestWithTokenPayload, @Query() query?: PurchaseQuery) {
    const paginationResult = await this.purchaseService.getCoachOrders(user, query);

    return fillDto(OrdersWithPaginationRdo, paginationResult);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Получение текущего баланса тренировок'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Тренировка с указаным ID не найдена'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:trainingId')
  public async getTrainingBalance(@Param('trainingId', ParseUUIDPipe) trainingId: string, @Req() { user }: RequestWithTokenPayload) {
    const training = await this.purchaseService.getTrainingPurchase(trainingId, user.sub);

    return fillDto(PurchaseRdo, training);
  }

  @ApiResponse({
    type: PurchaseRdo,
    status: HttpStatus.OK,
    description: 'Списание тренировок'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Тренировка с указаным ID не найдена'
  })
  @Patch('/:purchaseId')
  @UseGuards(JwtAuthGuard)
  public async reduceTrainingsCount(
    @Param('purchaseId', ParseUUIDPipe) purchaseId: string,
    @Body() dto: ReduceTrainingsDto
    ) {
    const purchase = await this.purchaseService.reduceTrainingsCount(purchaseId, dto);

    return fillDto(PurchaseRdo, purchase);
  }
}
