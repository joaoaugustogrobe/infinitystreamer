import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { Stream } from './entities/stream.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../track/track.module';
import { TimelineModule } from 'src/timeline/timeline.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stream]), TrackModule, TimelineModule],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
