import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TRANSCODE_QUEUE } from './constants';
import { Logger } from '@nestjs/common';

@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
  private readonly logger = new Logger(TranscodeConsumer.name, {
    timestamp: true,
  });

  private readonly waitTime = (timeout: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, timeout));
  };

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log(`Transcoding message: ${job.id}`);
    this.logger.debug(job.data);

    // simulate processing delay
    await this.waitTime(2000);
    this.logger.log(`Transcoding complete for job: ${job.id}`);
  }
}
