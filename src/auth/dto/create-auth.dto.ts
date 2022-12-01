import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    example: 'seuNomeDeUsuário',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'suaSenha',
  })
  @IsString()
  password: string;
}
