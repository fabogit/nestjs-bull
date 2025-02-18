import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { TRANSCODE_QUEUE } from './bull/constants';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(TRANSCODE_QUEUE) private readonly trasnscodeQueue: Queue,
  ) {}

  async transcode() {
    const data = {
      fileName: './file.mp3',
      // ...
    };
    await this.trasnscodeQueue.add(data, {});
  }
}
