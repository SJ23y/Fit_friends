import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsBoolean, IsIn, IsNumber, IsOptional, isString, IsString, Length, Max, Min } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.consts';
import { CoachQuestionnarie, Gender, LOCATIONS, Role, TRAIN_TYPES, TrainDuration, UserLevel, UserQuestionnarie } from '@backend/shared-core'
import { QuestionnaireDto } from './questionnaire.dto';
import { Transform, Type } from 'class-transformer';

export class UpdateUserDto {

  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'Vasiliy Pupkin'
  })
  @IsOptional()
  @IsString()
  @Length(1,15, {message: AuthenticationValidateMessage.NameNotValid})
  name?: string;

  @ApiProperty({
    description: 'User qustinnaire'
  })
  @IsOptional()
  @Type(() => QuestionnaireDto)
  questionnaire?: UserQuestionnarie | CoachQuestionnarie;

  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg'
  })
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(Gender), {message: AuthenticationValidateMessage.Gender})
  gender?: Gender;

  @ApiProperty({
    description: 'User birthday',
    example: '01.09.2020'
  })
  @IsOptional()
  @IsString()
  birthDate?: string;

  @ApiProperty({
    description: 'Short characteristic user about himself',
    example: 'I am a good boy, like my dog.'
  })
  @IsOptional()
  @IsString()
  @Length(10,140, {message: AuthenticationValidateMessage.Description})
  description?: string;

  @ApiProperty({
    description: 'Nearest subway station for user whereabouts',
    example: 'Спортивная'
  })
  @IsOptional()
  @IsString()
  @IsIn(LOCATIONS, {message: AuthenticationValidateMessage.Locations})
  location?: string;

  @ApiProperty({
    description: 'Background image for user page',
    example: 'back.jpg'
  })
  @IsOptional()
  backgroundImage?: string;

  @ApiProperty({
    description: 'Short characteristic user about himself',
    example: 'I am a good boy, like my dog.'
  })
  @IsIn(Object.values(Role), {message: AuthenticationValidateMessage.Role})
  @IsString()
  @IsOptional()
  role: Role;

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
  @Transform(({value}) => (isString(value) ? [value] : [...value]))
  @IsArray()
  @ArrayMaxSize(3, {message: AuthenticationValidateMessage.TrainTypesInvalidCount})
  @IsOptional()
  public trainType: string[];

  @ApiProperty({
    description: 'Peferred train duration',
    example: '15-80 минут'
  })
  @IsIn(Object.values(TrainDuration), {message: AuthenticationValidateMessage.InvalidTrainDuration})
  @IsString()
  @IsOptional()
  public trainDuration?: string;

  @ApiProperty({
    description: 'User goal for callories loss',
    example: 3000
  })
  @Min(1000, {message: AuthenticationValidateMessage.InvalidCallorieGoalQuantity})
  @Max(5000, {message: AuthenticationValidateMessage.InvalidCallorieGoalQuantity})
  @IsNumber()
  @Transform(({value}) => parseInt(value))
  @IsOptional()
  public calorieGoal?: number;

  @ApiProperty({
    description: 'Quantity of callories to lost in one day',
    example: 150
  })
  @IsNumber()
  @Transform(({value}) => parseInt(value))
  @Min(1000, {message: AuthenticationValidateMessage.InvalidCalloriePerDayQuantity})
  @Max(5000, {message: AuthenticationValidateMessage.InvalidCalloriePerDayQuantity})
  @IsOptional()
  public caloriePerDay?: number;

  @ApiProperty({
    description: 'Flag if user is ready to get invitation to trainings',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({value}) => (value === 'true') ? true : false)
  public isReadyForTrain?: boolean;

  @ApiProperty({
    description: 'Flag if coach is ready to gave individual trainings',
    example: true
  })
  @Transform(({value}) => (value === 'true') ? true : false)
  @IsBoolean()
  @IsOptional()
  public individualTraining?: boolean;

  @ApiProperty({
    description: 'Sertificate file path',
    example: 'sertificate.pdf'
  })
  @IsString()
  @IsOptional()
  public sertificate?: string;
}
