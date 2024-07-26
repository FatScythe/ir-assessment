import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginUserRequestDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(dto: RegisterUserRequestDto) {
    // check if email already exists...
    if (
      await this.userRepository.exists({
        where: { email: dto.email.toLowerCase() },
      })
    ) {
      throw new BadRequestException({
        status: 'failed',
        message: 'Email already exists',
        data: undefined,
      });
    }
    // hash password...
    dto.password = await argon.hash(dto.password);

    const user = await this.userRepository.save(
      this.userRepository.create(dto),
    );

    delete user.password;

    return { status: 'successful', message: 'User created', data: user };
  }

  async login(dto: LoginUserRequestDto) {
    // checks if request email exists...
    const user = await this.findUserByEmail(dto.email);

    if (!user) {
      throw new BadRequestException({
        status: 'failed',
        message: 'Invalid credentials',
        data: undefined,
      });
    }

    // verify the password...
    const isPasswordCorrect = await argon.verify(user.password, dto.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException({
        status: 'failed',
        message: 'Invalid credentials',
        data: undefined,
      });
    }

    // sign a token
    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return {
      status: 'successful',
      message: 'Login Successful',
      data: { ...dto, token },
    };
  }

  async profile(user: Pick<User, 'id' | 'email'>) {
    const currentUser = await this.findUserById(user.id);

    if (!currentUser) {
      throw new UnauthorizedException({
        status: 'failed',
        message: 'Invalid credentials',
        data: undefined,
      });
    }

    delete currentUser.password;

    return { status: 'successful', message: 'User Profile', data: currentUser };
  }

  async findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
