import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from '@backend/authentication';

export class ReviewRdo {
  @ApiProperty({
    description: 'Id of the current review',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Info about the author of the review',
    example: 'User'
  })
  @Expose()
  @Type(() => UserRdo)
  author: UserRdo;

  @ApiProperty({
    description: 'Id of the review\'s training',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @Expose()
  trainId: string;

  @ApiProperty({
    description: 'Review text',
    example: 'Exellent training'
  })
  @Expose()
  content: string;

  @ApiProperty({
    description: 'Raiting of the training',
    example: 5
  })
  @Expose()
  rate: number;

  @ApiProperty({
    description: 'Review\'s date',
    example: '2024-09-29 12:28:30.961'
  })
  @Expose()
  createdAt: Date;
}
