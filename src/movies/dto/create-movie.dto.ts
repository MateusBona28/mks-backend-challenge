import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: 'tituloDoFilme',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'duração do filme em segundos',
    example: 7200,
  })
  @IsNumber()
  duration: number;
}
