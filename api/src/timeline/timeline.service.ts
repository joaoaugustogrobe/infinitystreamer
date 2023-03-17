import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioTimeline } from './entities/timeline.entity';
import { Stream } from 'src/stream/entities/stream.entity';

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

  // addTrackToTimeline() {
  //   return;
  // }
}
