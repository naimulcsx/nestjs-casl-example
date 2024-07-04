import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth, AuthType } from '@/auth/decorators/auth.decorator';
import { CheckAbility } from '@/casl/decorators/check-ability.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Return all posts.' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: 200, description: 'Return a single post.' })
  @ApiParam({ name: 'id', description: 'The ID of the post', type: 'integer' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiBody({ type: CreatePostDto })
  @ApiBearerAuth()
  @CheckAbility('create', 'Post')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the post', type: 'integer' })
  @ApiBody({ type: UpdatePostDto })
  @ApiBearerAuth()
  @CheckAbility('update', 'Post')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the post', type: 'integer' })
  @ApiBearerAuth()
  @CheckAbility('delete', 'Post')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
