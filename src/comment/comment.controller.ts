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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/typeorm/entities/user.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('posts/:postId/comments')
  @HttpCode(200)
  getPostComments(@Param('postId') postId: number) {
    return this.commentService.getPostComments(postId);
  }

  @Post('posts/:postId/comments')
  @HttpCode(201)
  createComment(
    @Param('postId') postId: number,
    @Body() commentDto: CreateCommentDto,
    @GetUser() user: Pick<User, 'id' | 'email'>,
  ) {
    return this.commentService.postComment({
      postId,
      commentDto,
      authorId: user.id,
    });
  }

  @Put('comments/:id')
  @HttpCode(200)
  updateComment(
    @Param('id') id: number,
    @Body() dto: UpdateCommentDto,
    @GetUser() user: Pick<User, 'id' | 'email'>,
  ) {
    return this.commentService.updateComment({ id, authorId: user.id, dto });
  }

  @Delete('comments/:id')
  @HttpCode(200)
  deleteComment(
    @Param('id') id: number,
    @GetUser() user: Pick<User, 'id' | 'email'>,
  ) {
    return this.commentService.deleteComment(id, user.id);
  }
}
