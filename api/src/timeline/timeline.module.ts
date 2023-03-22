import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { Timeline, AudioTimeline } from './entities/timeline.entity';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [TypeOrmModule.forFeature([AudioTimeline]), TrackModule],
  controllers: [TimelineController],
  providers: [TimelineService],
  exports: [TimelineService],
})
export class TimelineModule {}
