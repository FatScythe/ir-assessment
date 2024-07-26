import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Post } from 'src/typeorm/entities/post.entity';
import { Comment } from 'src/typeorm/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
