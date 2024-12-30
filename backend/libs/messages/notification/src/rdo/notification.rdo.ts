import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class NotificationRdo {
  @ApiProperty({
    description: 'Unique notification ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Unique user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Text of notification',
    example: 'Notification'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Notification creation date',
    example: '2024-07-17'
  })
  @Expose()
  public createdAt: string;
}
