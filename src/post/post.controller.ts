import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/typeorm/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('')
  @HttpCode(200)
  getPosts() {
    return this.postService.getAllPost();
  }

  @Get(':id')
  @HttpCode(200)
  getPost(@Param('id') id: number) {
    return this.postService.getSinglePost(id);
  }

  @Post('')
  @HttpCode(201)
  createPost(
    @Body() body: CreatePostDto,
    @GetUser() user: Pick<User, 'id' | 'email'>,
  ) {
    return this.postService.createPost(body, user.id);
  }

  @Put(':id')
  @HttpCode(200)
  updatePost(
    @Param('id') id: number,
    @Body() body: UpdatePostDto,
    @GetUser() user: Pick<User, 'id' | 'email'>,
  ) {
    return this.postService.updatePost(body, id, user.id);
  }

  @Delete(':id')
  @HttpCode(200)
  deletePost(
    @Param('id') id: number,
    @GetUser() user: Pick<User, 'id' | 'email'>,
  ) {
    return this.postService.deletePost(id, user.id);
  }
}
