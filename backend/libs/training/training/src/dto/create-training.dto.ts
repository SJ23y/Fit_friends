import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { TrainingValidationMsssages } from "../training.conts";
import { Gender, TRAIN_TYPES, TrainDuration, TrainingValidationSetting, UserLevel } from "@backend/shared-core";
import { Transform } from "class-transformer";

export class CreateTrainingDto {
  @ApiProperty({
    description: 'Title of the training',
    example: 'Crossfit trainig for beginners'
  })
  @IsString()
  @Length(
    TrainingValidationSetting.TITLE_MIN_LENGTH,
    TrainingValidationSetting.TITLE_MAX_LENGTH,
    {message: TrainingValidationMsssages.TitleInvalid}
  )
  title: string;

  @ApiProperty({
    description: 'Image for the training page in jpg or png',
    example: 'image.jpg'
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Minimum User level for the training',
    example: 'любитель'
  })
  @IsIn(Object.values(UserLevel), {message: TrainingValidationMsssages.LevelInvalid})
  @IsString()
  level: UserLevel;

  @ApiProperty({
    description: 'Training\'s type',
    example: 'кроссфит'
  })
  @IsIn(TRAIN_TYPES, {message: TrainingValidationMsssages.TypeInvalid})
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Duration of the training',
    example: '10-30мин'
  })
  @IsIn(Object.values(TrainDuration), {message: TrainingValidationMsssages.DurationInvalid})
  @IsString()
  duration: TrainDuration;

  @ApiProperty({
    description: 'Training\'s price',
    example: 1500
  })
  @Transform(({value}) => parseInt(value, 10))
  @IsNumber({}, {message: TrainingValidationMsssages.PriceInvalid})
  price: number;

  @ApiProperty({
    description: 'Clorie quantity loss during the training',
    example: 2200
  })
  @IsNumber()
  @Max(TrainingValidationSetting.CALLORIES_MAX_COUNT, {message: TrainingValidationMsssages.CalloriesInvalid})
  @Min(TrainingValidationSetting.CALLORIES_MIN_COUNT, {message: TrainingValidationMsssages.CalloriesInvalid})
  @Transform(({value}) => parseInt(value, 10))
  callorieQuantity: number;

  @ApiProperty({
    description: 'Short description of the training',
    example: 'Goood good training'
  })
  @IsString()
  @Length(
    TrainingValidationSetting.DESCRIPTION_MIN_LENGTH,
    TrainingValidationSetting.DESCRIPTION_MAX_LENGTH,
    {message: TrainingValidationMsssages.DescriptionInvalid}
  )
  description: string;

  @ApiProperty({
    description: 'Train separation by the gender',
    example: 'мужской'
  })
  @IsIn(Object.values(Gender), {message: TrainingValidationMsssages.GenderInvalid})
  @IsString()
  gender: Gender;

  @ApiProperty({
    description: 'Video of the tarining in formats mov/avi/mp4',
    example: 'video.mp4'
  })
  @IsOptional()
  video: string;

  @ApiProperty({
    description: 'Special offer flag',
    example: true
  })
  @Transform(({value}) => Boolean(value))
  @IsBoolean({message: TrainingValidationMsssages.SpecialInvalid})
  isSpecialOffer: boolean;
}
