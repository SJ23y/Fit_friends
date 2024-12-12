import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class TrainingRequestRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @Expose()
  public senderId: string;

  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @Expose()
  public recieverId: string;

  @ApiProperty({
    description: 'Status of the request',
    example: 'approved'
  })
  @Expose()
  status: string;
}
