import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createPost(dto: CreatePostDto, userId: number) {
    const author = await this.findUserById(userId);
    if (!author) {
      throw new UnauthorizedException({
        status: 'failed',
        message: 'Invalid credentials',
        data: undefined,
      });
    }
    const post = await this.postRepository.save(
      this.postRepository.create({
        author,
        title: dto.title,
        content: dto.content,
      }),
    );

    delete post.author.password;

    return { status: 'successful', message: 'Post created', data: post };
  }

  async getAllPost() {
    const posts = await this.findAllPost();

    const modifiedPosts = posts.map((post) => {
      delete post.author.password;
      return { ...post };
    });

    // TODO: Add pagination
    return {
      status: 'successful',
      message: 'Post created',
      data: modifiedPosts,
    };
  }

  async getSinglePost(postId: number) {
    const post = await this.findPostById(postId);

    if (!post) {
      throw new NotFoundException({
        status: 'failed',
        message: `Post with id: ${postId} not found`,
        data: undefined,
      });
    }

    delete post.author.password;

    return {
      status: 'successful',
      message: 'Post created',
      data: post,
    };
  }

  async updatePost(postDto: UpdatePostDto, postId: number, authorId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        author: {
          id: authorId,
        },
      },
    });

    if (!post) {
      throw new BadRequestException({
        status: 'failed',
        message: `Post with id: ${postId} not found`,
        data: undefined,
      });
    }

    post.title = postDto.title;
    post.content = postDto.content;

    await this.postRepository.save(post);

    return {
      status: 'successful',
      message: 'Post updated',
      data: post,
    };
  }

  async deletePost(postId: number, authorId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        author: {
          id: authorId,
        },
      },
    });

    if (!post) {
      throw new BadRequestException({
        status: 'failed',
        message: `Post with id: ${postId} not found`,
        data: undefined,
      });
    }

    await this.postRepository.remove(post);

    return {
      status: 'successful',
      message: 'Post deleted',
      data: undefined,
    };
  }

  async findAllPost() {
    return this.postRepository.find({ relations: ['author'] });
  }

  async findPostById(postId: number) {
    return this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'comments'],
    });
  }

  async findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
