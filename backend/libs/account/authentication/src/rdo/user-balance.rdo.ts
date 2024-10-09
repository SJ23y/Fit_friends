import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserBalanceRdo {
  @ApiProperty({
    description: 'Total count of available trainings on user balance',
    example: 50
  })
  @Expose()
  totalTrainingsCount: number;
}
