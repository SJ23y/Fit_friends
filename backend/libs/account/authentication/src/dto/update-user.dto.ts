import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, Length } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.consts';
import { Gender, LOCATIONS } from '@backend/shared-core'

export class UpdateUserDto {

  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'Vasiliy Pupkin'
  })
  @IsOptional()
  @IsString()
  @Length(1,15, {message: AuthenticationValidateMessage.NameNotValid})
  public name?: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg'
  })
  @IsOptional()
  public avatar?: string;

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
}
