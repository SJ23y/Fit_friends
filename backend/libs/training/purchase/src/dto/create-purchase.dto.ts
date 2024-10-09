import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsIn, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";
import { PurchaseValidationMessages } from "../purchase.consts";
import { Transform } from "class-transformer";
import { PaymentType } from "@backend/shared-core";

export class CreatePurchaseDto {
  @ApiProperty({
    description: 'Type of the purchase',
    example: 'абонемент'
  })
  @IsString()
  @Equals('абонемент', {message: PurchaseValidationMessages.typeIncorrect})
  type: string;

  @ApiProperty({
    description: 'Id of the training that was bought',
    example: '47afabea-114d-4b58-ad86-f3171733eba0'
  })
  @IsUUID('all', {message: PurchaseValidationMessages.uuidIncorrect})
  trainId: string;

  @ApiProperty({
    description: 'Price of one training',
    example: 1500
  })
  @IsNumber()
  @Transform(({value}) => parseInt(value, 10))
  price: number;

  @ApiProperty({
    description: 'Train count that was bought',
    example: 5
  })
  @IsNumber()
  @Min(1, {message: PurchaseValidationMessages.minTrainingCountIncorrect})
  @Max(50, {message: PurchaseValidationMessages.maxTrainingCountIncorrect})
  @Transform(({value}) => parseInt(value, 10))
  trainCount: number;

  @ApiProperty({
    description: 'Payment type of the purchase',
    example: 'visa'
  })
  @IsIn(Object.values(PaymentType))
  paymentType: string;
}
