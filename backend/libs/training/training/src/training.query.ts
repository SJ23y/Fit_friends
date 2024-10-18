import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_PAGE_NUMBER, MAX_TRAINING_COUNT_LIMIT, FilterBy, SortBy, SortDirection } from '@backend/shared-core';

export class TrainingQuery {
  @ApiProperty({
    description: 'Requested count of the trainings',
    example: 15
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10) || MAX_TRAINING_COUNT_LIMIT)
  count?: number = MAX_TRAINING_COUNT_LIMIT;

  @ApiProperty({
    description: 'Requested page',
    example: 5
  })
  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE_NUMBER)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE_NUMBER

  @ApiProperty({
    description: 'Name of the training field to filter by',
    example: 'isSpecialOffer'
  })
  @IsOptional()
  public filterBy?: FilterBy

  @ApiProperty({
    description: 'Sorting by information',
    example: 'popular'
  })
  @IsOptional()
  public sortBy?: SortBy

  @ApiProperty({
    description: 'Direction of the sorting',
    example: 'asc'
  })
  @IsOptional()
  public sortDirection?: SortDirection
}
