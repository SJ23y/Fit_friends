import { ApiProperty } from "@nestjs/swagger";
import { PurchaseValidationMessages } from "../purchase.consts";
import { IsNumber, IsUUID, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class ReduceTrainingsDto {
  @ApiProperty({
    description: 'Id of the training that was bought',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @IsUUID('all', {message: PurchaseValidationMessages.uuidIncorrect})
  trainId: string;

  @ApiProperty({
    description: 'Train count that was bought',
    example: 5
  })
  @IsNumber()
  @Min(1, {message: PurchaseValidationMessages.minTrainingCountIncorrect})
  @Max(50, {message: PurchaseValidationMessages.maxTrainingCountIncorrect})
  @Transform(({value}) => parseInt(value, 10))
  trainCount: number;
}
