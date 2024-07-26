import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from 'src/app.utils';

export class LoginUserRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(PASSWORD_RULE, {
    message: PASSWORD_RULE_MESSAGE,
  })
  password: string;
}
