import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Desenvolvedor',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: '987',
  })
  @IsString()
  password: string;
}
