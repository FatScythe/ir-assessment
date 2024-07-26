import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Post } from 'src/typeorm/entities/post.entity';
import { Comment } from 'src/typeorm/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
