import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class QustionnaireRdo {
  @ApiProperty({
    description: 'User level',
    example: 'любитель'
  })
  @Expose()
  public userLevel: string;

  @ApiProperty({
    description: 'Peferred train types',
    example: ['бег', 'бокс']
  })
  @Expose()
  public trainType: string[];

  @ApiProperty({
    description: 'Peferred train duration',
    example: '15-80 минут'
  })
  @Expose()
  public trainDuration: string;

  @ApiProperty({
    description: 'User goal for callories loss',
    example: 3000
  })
  @Expose()
  public calorieGoal: number;

  @ApiProperty({
    description: 'Quantity of calories to lost in one day',
    example: 150
  })
  @Expose()
  public caloriePerDay: number;

  @ApiProperty({
    description: 'Flag if user is ready to get invitation to trainings',
    example: true
  })
  @Expose()
  public isReadyForTrain: boolean;

  @ApiProperty({
    description: 'description of coach merits',
    example: 'I am crazy'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Flag if coach is ready to give individual trainings',
    example: true
  })
  @Expose()
  public individualTraining: boolean;
}

