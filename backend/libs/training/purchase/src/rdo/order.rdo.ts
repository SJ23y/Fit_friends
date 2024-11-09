import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class OrderRdo {
  @ApiProperty({
    description: 'Type of the training',
    example: 'йога'
  })
  @Expose()
  type: string;

  @ApiProperty({
    description: 'Price of the training',
    example: '2024'
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Total price of all training\'s orders',
    example: '202409'
  })
  @Transform(({value}) => parseInt(value, 10))
  @Expose()
  trainTotalPrice: number;

  @ApiProperty({
    description: 'Total count of all training\'s orders',
    example: '2024-09-29 12:28:30.961'
  })
  @Transform(({value}) => parseInt(value, 10))
  @Expose()
  trainTotalCount: number;

  @ApiProperty({
    description: 'Author of the training ID',
    example: '00111449-79b9-4a5e-88cf-dd9e5a054ac4'
  })
  @Expose()
  coachId: string;

  @ApiProperty({
    description: 'Training ID',
    example: '00111449-79b9-4a5e-88cf-dd9e5a054ac4'
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Path to image of the training',
    example: 'uploads/image.jpg'
  })
  @Expose()
  image: string;

  @ApiProperty({
    description: 'Callorie loss during the training',
    example: '202'
  })
  @Expose()
  callorieQuantity: number;

  @ApiProperty({
    description: 'Rate of the training',
    example: '5'
  })
  @Expose()
  rate: number;

  @ApiProperty({
    description: 'Creation date of the training',
    example: '2024-09-29 12:28:30.961'
  })
  @Expose()
  createdAt: number;

  @ApiProperty({
    description: 'Title of the training',
    example: 'Title title title'
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Description',
    example: 'What to say? It is wonderful training. Take it!'
  })
  @Expose()
  description: string;
}
