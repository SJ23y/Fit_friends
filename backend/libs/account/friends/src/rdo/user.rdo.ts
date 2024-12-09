import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class FriendRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Unique name',
    example: 'Vasiliy Pupkin'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Unique avatar',
    example: 'avatar.jpg'
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'Subway station near user whereabouts',
    example: 'Спортивная'
  })
  @Expose()
  public location: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'тренер'
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'Train types user is specialized',
    example: ['пилатес']
  })
  @Expose()
  public trainTypes: string[];

  @ApiProperty({
    description: 'User status for training requests',
    example: true
  })
  @Expose()
  public trainingRequests: boolean;
}
