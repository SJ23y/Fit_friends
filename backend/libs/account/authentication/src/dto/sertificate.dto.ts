import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SertificateDto {
  @ApiProperty({
    description: 'File path of existed sertificate',
    example: 'sertificate.pdf'
  })
  @IsOptional()
  path: string;
}
