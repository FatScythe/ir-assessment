import { IsNotEmpty, Length } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @Length(3, 1000)
  content: string;
}
