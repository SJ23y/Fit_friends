import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { UserRdo } from "./user.rdo";

export class UserWithPaginationRdo {
  @ApiProperty({
    description: 'List of users',
    example: ['user1', 'user2']
  })
  @Expose()
  @Type(() => UserRdo)
  entities: UserRdo[];

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
