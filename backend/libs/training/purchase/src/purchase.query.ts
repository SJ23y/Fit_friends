import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_PAGE_NUMBER, MAX_PURCHASE_COUNT_LIMIT } from '@backend/shared-core';


export class PurchaseQuery {
  @ApiProperty({
    description: 'Current entity instances count',
    example: 10
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10) || MAX_PURCHASE_COUNT_LIMIT)
  count: number = MAX_PURCHASE_COUNT_LIMIT;

  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE_NUMBER)
  @IsOptional()
  public page: number = DEFAULT_PAGE_NUMBER
}
