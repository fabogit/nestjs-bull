import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TRANSCODE_QUEUE } from './constants';
import { Logger } from '@nestjs/common';

@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
  private readonly logger = new Logger(TranscodeConsumer.name, {
    timestamp: true,
  });
  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.debug(job);
  }
}
