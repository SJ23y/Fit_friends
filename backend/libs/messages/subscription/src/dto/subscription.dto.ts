import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUUID, Length } from 'class-validator';
import { SubscriptionValidationMessages } from "../subscription.consts";

export class SubscriptionDto {
   @ApiProperty({
    description: 'Subscriber id',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @IsUUID('all', {message: SubscriptionValidationMessages.invalidUUID})
  subscribeById: string;

   @ApiProperty({
    description: 'Subscriber name',
    example: 'Max'
  })
  @IsString()
  @Length(1, 15, {message: SubscriptionValidationMessages.invalidName})
  subscribeByName: string;

   @ApiProperty({
    description: 'Subscriber email address',
    example: 'pupkin@mail.com'
  })
  @IsEmail({}, {message: SubscriptionValidationMessages.invalidEmail})
  subscribeByEmail: string;

   @ApiProperty({
    description: 'Id of the user  subscription made to',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @IsUUID('all', {message: SubscriptionValidationMessages.invalidUUID})
  subscribeToId: string;

   @ApiProperty({
    description: 'Name of the user  subscription made to',
    example: 'Ted Lasso'
  })
  @IsString()
  @Length(1, 15, {message: SubscriptionValidationMessages.invalidName})
  subscribeToName:  string;
}
