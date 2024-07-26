import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { TypeORMModule } from './typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/_env/.env`,
    }),
    UserModule,
    PostModule,
    CommentModule,
    TypeORMModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
