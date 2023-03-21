import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioTimeline } from './entities/timeline.entity';
import { Stream } from 'src/stream/entities/stream.entity';
import { AddTrackToTimelineDTO } from './dto/add-track-timeline.dto';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(AudioTimeline)
    private audioTimelineRepository: Repository<AudioTimeline>,
  ) {}

  async createAudioTimeline(stream: Stream): Promise<AudioTimeline> {
    return this.audioTimelineRepository.save({
      stream,
      tracks: [],
    });
  }

  async findAll(): Promise<AudioTimeline[]> {
    return this.audioTimelineRepository.find({ take: 30, skip: 0 });
  }

  addTrackToTimeline(payload: AddTrackToTimelineDTO) {
    console.log(payload);
    return;
  }
}
