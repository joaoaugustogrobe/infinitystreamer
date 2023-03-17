import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { Timeline, AudioTimeline } from './entities/timeline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AudioTimeline])],
  controllers: [TimelineController],
  providers: [TimelineService],
  exports: [TimelineService],
})
export class TimelineModule {}
