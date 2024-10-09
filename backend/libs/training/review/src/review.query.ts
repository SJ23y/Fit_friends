import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_PAGE_NUMBER, MAX_REVIEW_COUNT_LIMIT } from '@backend/shared-core';


export class ReviewQuery {
  @ApiProperty({
    description: 'Short characteristic user about himself',
    example: 'I am a good boy, like my dog.'
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10) || MAX_REVIEW_COUNT_LIMIT)
  count: number = MAX_REVIEW_COUNT_LIMIT;

  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE_NUMBER)
  @IsOptional()
  public page: number = DEFAULT_PAGE_NUMBER
}
