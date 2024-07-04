import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Post Title', description: 'The title of the post' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Post Content',
    description: 'The content of the post',
  })
  @IsString()
  content: string;
}
