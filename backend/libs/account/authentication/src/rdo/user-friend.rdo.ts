import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserFriendRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @Expose()
  public friendId: string;

}
