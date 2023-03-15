import { Module } from '@nestjs/common';
import { AudioMediaService } from './audio-media.service';
import { AudioMediaController } from './audio-media.controller';

@Module({
  providers: [AudioMediaService],
  controllers: [AudioMediaController],
})
export class AudioMediaModule {}
