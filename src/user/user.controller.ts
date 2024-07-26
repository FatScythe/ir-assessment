import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { LoginUserRequestDto } from './dto/login-user.dto';
import { Public } from './auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/typeorm/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  @HttpCode(201)
  registerUser(@Body() body: RegisterUserRequestDto) {
    return this.userService.register(body);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  loginUser(@Body() body: LoginUserRequestDto) {
    return this.userService.login(body);
  }

  @Get('profile')
  @HttpCode(200)
  async viewProfile(@GetUser() user: Pick<User, 'id' | 'email'>) {
    return this.userService.profile(user);
  }
}
