import { Injectable } from '@nestjs/common';
import { TRANSCODE_QUEUE } from './bull/constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(TRANSCODE_QUEUE) private readonly trasnscodeQueue: Queue,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async transcode() {
    const data = {
      fileName: './file.mp3',
      // ...
    };
    await this.trasnscodeQueue.add(data, {});
  }
}
