import { TrainingRdo } from '@backend/training';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class PurchaseRdo {
  @ApiProperty({
    description: 'Id of the current purchase',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Type of the purchase',
    example: 'абонемент'
  })
  @Expose()
  type: string;


  @ApiProperty({
    description: 'Id of the training that was bought',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @Expose()
  trainId: string;

  @ApiProperty({
    description: 'Id of the buyer',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Price of one training',
    example: 1500
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Train count that was bought',
    example: 5
  })
  @Expose()
  trainCount: number;

  @ApiProperty({
    description: 'Price of all trainings',
    example: 7500
  })
  @Expose()
  totalPrice: number;

  @ApiProperty({
    description: 'Payment type of the purchase',
    example: 'visa'
  })
  @Expose()
  paymentType: string;

  @ApiProperty({
    description: 'Purchase\'s date',
    example: '2024-09-29 12:28:30.961'
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Buyed training info',
    example: '{Training}'
  })
  @Expose()
  @Type(() => TrainingRdo)
  train: TrainingRdo;
}

