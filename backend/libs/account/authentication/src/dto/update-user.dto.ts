import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, Length } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.consts';
import { Gender, LOCATIONS, Role } from '@backend/shared-core'
import { QuestionnaireDto } from './questionnaire.dto';
import { Type } from 'class-transformer';

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
    description: 'Questionnaire for the user',
    example: '{QuestionnaireObject}'
  })
  @IsOptional()
  @Type(() => QuestionnaireDto)
  questionnaire?: QuestionnaireDto;

  @ApiProperty({
    description: 'Short characteristic user about himself',
    example: 'I am a good boy, like my dog.'
  })
  @IsIn(Object.values(Role), {message: AuthenticationValidateMessage.Role})
  @IsString()
  @IsOptional()
  role: Role;
}
