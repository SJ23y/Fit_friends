import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TrainingRdo {
  @ApiProperty({
    description: 'Id of the current tarining',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Title of the training',
    example: 'Crossfit trainig for beginners'
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Image for the training page in jpg or png',
    example: 'image.jpg'
  })
  @Expose()
  image: string;

  @ApiProperty({
    description: 'Minimum User level for the training',
    example: 'любитель'
  })
  @Expose()
  level: string;

  @ApiProperty({
    description: 'Training\'s type',
    example: 'кроссфит'
  })
  @Expose()
  type: string;

  @ApiProperty({
    description: 'Duration of the training',
    example: '10-30мин'
  })
  @Expose()
  duration: string;

  @ApiProperty({
    description: 'Training\'s price',
    example: 1500
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Clorie quantity loss during the training',
    example: 2200
  })
  @Expose()
  callorieQuantity: number;

  @ApiProperty({
    description: 'Short description of the training',
    example: 'Goood good training'
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Train separation by the gender',
    example: 'мужской'
  })
  @Expose()
  gender: string;

  @ApiProperty({
    description: 'Video of the tarining in formats mov/avi/mp4',
    example: 'video.mp4'
  })
  @Expose()
  video: string;

  @ApiProperty({
    description: 'Raiting of the training',
    example: 4.5
  })
  @Expose()
  rate: number;

  @ApiProperty({
    description: 'Id of the training\'s coach',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @Expose()
  coachId: string;

  @ApiProperty({
    description: 'Special offer flag',
    example: true
  })
  @Expose()
  isSpecialOffer: boolean;

  @ApiProperty({
    description: 'Date of training creation',
    example: '2024-09-29 12:28:30.961'
  })
  @Expose()
  createdAt: Date;
}

