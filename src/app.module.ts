import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemeModule } from './meme/meme.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [MemeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
