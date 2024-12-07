import { DEFAULT_PAGE_NUMBER, MAX_USER_COUNT_LIMIT, SortBy, SortDirection } from "@backend/shared-core";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class UserQuery {
  @ApiProperty({
    description: 'Current entity instances count',
    example: 10
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10) || MAX_USER_COUNT_LIMIT)
  count: number = MAX_USER_COUNT_LIMIT;

  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE_NUMBER)
  @IsOptional()
  public page: number = DEFAULT_PAGE_NUMBER;

  @ApiProperty({
    description: 'Sorting by information',
    example: 'popular'
  })
  @IsOptional()
  public sortBy?: SortBy;

  @ApiProperty({
    description: 'Direction of the sorting',
    example: 'asc'
  })
  @IsOptional()
  public sortDirection?: SortDirection;

  @ApiProperty({
    description: 'By locations filter',
    example: ['Пионерская']
  })
  @IsOptional()
  public locations?: string[];

  @ApiProperty({
    description: 'By training types filter',
    example: ['пилатес']
  })
  @IsOptional()
  public type?: string[];

  @ApiProperty({
    description: 'By level filter',
    example: 'новичок'
  })
  @IsOptional()
  public level?: string;
}
