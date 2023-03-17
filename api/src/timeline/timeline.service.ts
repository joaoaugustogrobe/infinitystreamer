import { Injectable } from '@nestjs/common';
import { Track } from '../track/entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  addTrackToTimeline() {
    return;
  }
}
