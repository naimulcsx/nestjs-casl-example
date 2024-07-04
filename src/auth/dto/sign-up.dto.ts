import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'naimulcsx',
    description: 'The username of the user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'z1Tlxb1tuXH7',
    description: 'The password of the user',
  })
  @IsString()
  password: string;
}
