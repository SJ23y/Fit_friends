import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Length, Max, Min } from 'class-validator';
import { ReviewValidateMessages } from '../review.consts';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Id of the review\'s training',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @IsUUID('all', {message: ReviewValidateMessages.invalidUUID})
  trainId: string;

  @ApiProperty({
    description: 'Review text',
    example: 'Exellent training'
  })
  @IsString()
  @Length(100, 1024, {message: ReviewValidateMessages.invalidContentLength})
  content: string;

  @ApiProperty({
    description: 'Raiting of the training',
    example: 5
  })
  @IsNumber()
  @Max(5, {message: ReviewValidateMessages.rateInvalid})
  @Min(1, {message: ReviewValidateMessages.rateInvalid})
  rate: number;
}
