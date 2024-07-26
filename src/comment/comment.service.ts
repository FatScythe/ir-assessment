import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/comment.entity';
import { Post } from 'src/typeorm/entities/post.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async postComment({
    commentDto,
    postId,
    authorId,
  }: {
    commentDto: CreateCommentDto;
    postId: number;
    authorId: number;
  }) {
    const [post, author] = await Promise.all([
      this.findPostById(postId),
      this.findUserById(authorId),
    ]);

    if (!post) {
      throw new BadRequestException({
        status: 'failed',
        message: `Post with id: ${postId} not found`,
        data: undefined,
      });
    }

    if (!author) {
      throw new UnauthorizedException({
        status: 'failed',
        message: `Invalid Credentials`,
        data: undefined,
      });
    }

    const comment = await this.commentRepository.save(
      this.commentRepository.create({
        content: commentDto.content,
        author,
        post,
      }),
    );

    delete comment.author.password;
    delete comment.author.posts;

    return { status: 'successful', message: 'Comment created', data: comment };
  }

  async getPostComments(postId: number) {
    const comments = await this.commentRepository.find({
      where: {
        post: {
          id: postId,
        },
      },
    });

    return {
      status: 'successful',
      message: 'Post comments',
      data: comments,
    };
  }

  async updateComment({
    id,
    dto,
    authorId,
  }: {
    id: number;
    dto: UpdateCommentDto;
    authorId: number;
  }) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
        author: {
          id: authorId,
        },
      },
    });

    if (!comment) {
      throw new BadRequestException({
        status: 'failed',
        message: `Comment with id: ${id} not found`,
        data: undefined,
      });
    }

    comment.content = dto.content;

    await this.commentRepository.save(comment);

    return {
      status: 'successful',
      message: 'Comment updated',
      data: comment,
    };
  }

  async deleteComment(id: number, authorId: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
        author: {
          id: authorId,
        },
      },
    });

    if (!comment) {
      throw new BadRequestException({
        status: 'failed',
        message: `Comment with id: ${id} not found`,
        data: undefined,
      });
    }

    await this.commentRepository.remove(comment);

    return {
      status: 'successful',
      message: 'Comment deleted',
      data: undefined,
    };
  }

  async findPostById(postId: number) {
    return this.postRepository.findOneBy({ id: postId });
  }

  async findUserById(userId: number) {
    return this.userRepository.findOneBy({ id: userId });
  }
}
