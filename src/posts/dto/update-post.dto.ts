import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    example: 'Updated Post Title',
    description: 'The updated title of the post',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Updated Post Content',
    description: 'The updated content of the post',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;
}
