import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '../../app.utils';
import { Transform } from 'class-transformer';

export class RegisterUserRequestDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(PASSWORD_RULE, {
    message: PASSWORD_RULE_MESSAGE,
  })
  password: string;
}
