import { Expose, Type } from "class-transformer";
import { TrainingRdo } from "./training.rdo";
import { ApiProperty } from "@nestjs/swagger";

export class TrainingsWithPaginationRdo {
  @ApiProperty({
    description: 'List of trainings',
    example: ['tarining1', 'tarining2']
  })
  @Expose()
  @Type(() => TrainingRdo)
  entities: TrainingRdo[];

  @ApiProperty({
    description: 'Total page count of selected entity',
    example: 10
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Current page number',
    example: 2
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Total items count of selected entity',
    example: 50
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Number of items on one page',
    example: 20
  })
  @Expose()
  public itemsPerPage: number;

}
