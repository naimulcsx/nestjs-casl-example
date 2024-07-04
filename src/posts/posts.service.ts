import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.postsRepository.delete(id);
    return post;
  }
}
