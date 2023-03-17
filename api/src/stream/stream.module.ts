import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { Stream } from './entities/stream.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  VideoTimeline,
  AudioTimeline,
} from 'src/timeline/entities/timeline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stream, VideoTimeline, AudioTimeline])],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
