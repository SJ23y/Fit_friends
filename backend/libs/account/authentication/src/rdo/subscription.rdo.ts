import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class SubscriptionRdo {
  @ApiProperty({
      description: 'Unique subscriber ID',
      example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
    })
  @Expose()
  subscribeById: string;

  @ApiProperty({
    description: 'Subscriber name',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  subscribeByName: string;

  @ApiProperty({
    description: 'Subscriber email',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  subscribeByEmail: string;

  @ApiProperty({
    description: 'Unique user of subscription ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  subscribeToId: string;

  @ApiProperty({
    description: 'Name of the user of subscription',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  subscribeToName: string;

}
