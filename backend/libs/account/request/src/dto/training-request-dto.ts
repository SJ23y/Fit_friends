import { RequestStatus } from "@backend/shared-core";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, IsUUID } from "class-validator";

export class TrainingRequestDto {
  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @IsUUID('all', {message: 'Id should be valid UUID'})
  public senderId: string;

  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @IsUUID('all', {message: 'Id should be valid UUID'})
  public recieverId: string;

  @ApiProperty({
    description: 'Status of the request',
    example: 'approved'
  })
  @IsString()
  @IsIn(Object.values(RequestStatus), {message: 'Wrong request status'})
  status: string;
}
