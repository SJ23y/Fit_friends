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

  @ApiProperty({
    description: 'Min price filter',
    example: 5
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  public minPrice?: number

  @ApiProperty({
    description: 'Max price filter',
    example: 100
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  public maxPrice?: number

  @ApiProperty({
    description: 'Min callories filter',
    example: 100
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  public minCallories?: number

  @ApiProperty({
    description: 'Max callories filter',
    example: 200
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  public maxCallories?: number

  @ApiProperty({
    description: 'Min rating filter',
    example: 1
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  public minRating?: number

  @ApiProperty({
    description: 'Max rating filter',
    example: 5
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  public maxRating?: number

  @ApiProperty({
    description: 'Trainings type filter',
    example: ['бег', 'йога']
  })
  @IsOptional()
  public type?: string[]

  @ApiProperty({
    description: 'Free trainings filter',
    example: true
  })
  @IsOptional()
  public free?: boolean
}
