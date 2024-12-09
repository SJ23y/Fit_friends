import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { FriendRdo } from "./user.rdo";

export class FriendsWithPaginationRdo {
  @ApiProperty({
    description: 'List of friends',
    example: ['friend1', 'friend2']
  })
  @Expose()
  @Type(() => FriendRdo)
  entities: FriendRdo[];

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
