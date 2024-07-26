import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_NAME } from './typeorm.constant';
import { configuration } from 'src/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: configuration().dbUsername,
        password: configuration().dbPassword,
        database: DB_NAME,
        entities: [User, Post, Comment],
        synchronize: true,
      }),
    }),
  ],
})
export class TypeORMModule {}
