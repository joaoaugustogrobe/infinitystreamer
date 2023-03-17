import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';

@Module({
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}
