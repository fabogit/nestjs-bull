import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TRANSCODE_QUEUE } from './bull/constants';
import { TranscodeConsumer } from './bull/trancode.consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'), // 'localhost',
          port: configService.get('REDIS_PORT'), // 6379,
        },
      }),
    }),
    BullModule.registerQueue({
      name: TRANSCODE_QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TranscodeConsumer],
})
export class AppModule {}
