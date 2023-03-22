import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { ApiTags } from '@nestjs/swagger';
import { AddTrackToTimelineDTO } from './dto/add-track-timeline.dto';
import { AudioTimeline, Track } from './entities/timeline.entity';
import { BindParam } from 'src/decorators/bindParam';
import { Stream } from 'stream';
import { ApiBindId } from 'src/decorators/apiBindId';

@Controller('timeline')
@ApiTags('Timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  // addTrackToTimeline

  @Get()
  findAll() {
    return this.timelineService.findAll();
  }

  @Post(':id/add-track')
  @ApiBindId('Timeline id')
  addTrackToTimeline(
    @BindParam('id') timeline: AudioTimeline,
    @Body() addTrackToTimeline: AddTrackToTimelineDTO,
  ) {
    return this.timelineService.addTrackToTimeline(
      timeline,
      addTrackToTimeline,
    );
  }
}
