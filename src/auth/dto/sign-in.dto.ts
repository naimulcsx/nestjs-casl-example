import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'naimulcsx',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'z1Tlxb1tuXH7',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
