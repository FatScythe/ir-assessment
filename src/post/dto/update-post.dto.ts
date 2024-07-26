import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @Length(4, 255)
  title: string;

  @IsNotEmpty()
  @Length(20, 1000)
  content: string;
}
