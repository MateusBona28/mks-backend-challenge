import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({
    example: 'tituloDoFilme',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'duração do filme em segundos',
    example: 7200,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;
}
