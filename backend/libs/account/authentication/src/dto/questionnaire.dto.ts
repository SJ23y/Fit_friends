import { TRAIN_TYPES, TrainDuration, UserLevel } from "@backend/shared-core";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsIn, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.consts";

export class QuestionnaireDto {
    @ApiProperty({
      description: 'User level',
      example: 'любитель'
    })
    @IsIn(Object.values(UserLevel), {message: AuthenticationValidateMessage.InvalidUserLevel})
    @IsString()
    @IsOptional()
    public userLevel: string;

    @ApiProperty({
      description: 'Peferred train types',
      example: ['бег', 'бокс']
    })
    @IsIn(TRAIN_TYPES, {each: true, message: AuthenticationValidateMessage.InvalidTrainType})
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    public trainType: string[];

    @ApiProperty({
      description: 'Peferred train duration',
      example: '15-80 минут'
    })
    @IsIn(Object.values(TrainDuration), {message: AuthenticationValidateMessage.InvalidTrainDuration})
    @IsString()
    @IsOptional()
    public trainDuration: string;

    @ApiProperty({
      description: 'User goal for callories loss',
      example: 3000
    })
    @Min(1000, {message: AuthenticationValidateMessage.InvalidCallorieGoalQuantity})
    @Max(5000, {message: AuthenticationValidateMessage.InvalidCallorieGoalQuantity})
    @IsNumber()
    @IsOptional()
    public calorieGoal: number;

    @ApiProperty({
      description: 'Quantity of callories to lost in one day',
      example: 150
    })
    @IsNumber()
    @Min(1000, {message: AuthenticationValidateMessage.InvalidCalloriePerDayQuantity})
    @Max(5000, {message: AuthenticationValidateMessage.InvalidCalloriePerDayQuantity})
    @IsOptional()
    public caloriePerDay: number;

    @ApiProperty({
      description: 'Flag if user is ready to get invitation to trainings',
      example: true
    })
    @IsBoolean()
    @IsOptional()
    public isReadyForTrain: boolean;
}

