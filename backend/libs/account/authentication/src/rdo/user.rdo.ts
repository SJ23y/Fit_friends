import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { QustionnaireRdo } from "./questionnaire.rdo";
import { TrainingRdo } from "./training.rdo";

export class UserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Unique user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Unique name',
    example: 'Vasiliy Pupkin'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Unique avatar',
    example: 'avatar.jpg'
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'Registration date',
    example: '2024-07-17'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'User\'s gender',
    example: 'мужской'
  })
  @Expose()
  public gender: string;

  @ApiProperty({
    description: 'Birthday of the user',
    example: '20.09.2000'
  })
  @Expose()
  public birthDate: string;

  @ApiProperty({
    description: 'Description of the user for the profile',
    example: `Assertively generate end-to-end platforms vis-a-vis transparent web-readiness. Seamlessly leverage other's leading-edge total linkage for extensible internal or "organic" sources.`
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Subway station near user whereabouts',
    example: 'Спортивная'
  })
  @Expose()
  public location: string;

  @ApiProperty({
    description: 'Background image for the user profile page',
    example: 'back.jpg'
  })
  @Expose()
  public backgroundImage: string;

  @ApiProperty({
    description: 'Questionnaire of the user',
    example: 'Some object'
  })
  @Expose()
  @Type(() => QustionnaireRdo)
  public questionnaire: QustionnaireRdo;

  @ApiProperty({
    description: 'Role of the user',
    example: 'User'
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'Coach\' trainings list',
    example: '[{TrainingObject}]'
  })
  @Type(() => TrainingRdo)
  @Expose()
  public trainings: TrainingRdo;
}
