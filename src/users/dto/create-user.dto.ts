import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
