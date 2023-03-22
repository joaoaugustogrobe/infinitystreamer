import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioTimeline, Track, Timeline } from './entities/timeline.entity';
import { Stream } from 'src/stream/entities/stream.entity';
import { AddTrackToTimelineDTO } from './dto/add-track-timeline.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(AudioTimeline)
    private readonly audioTimelineRepository: Repository<AudioTimeline>,
    private readonly trackService: TrackService,
  ) {}

  async createAudioTimeline(stream: Stream): Promise<AudioTimeline> {
    return this.audioTimelineRepository.save({
      stream,
      tracks: [],
    });
  }

  async findOne(id: number): Promise<AudioTimeline> {
    return this.audioTimelineRepository.findOneBy({ id });
  }

  async findAllByStreamId(streamId: number): Promise<AudioTimeline[]> {
    return this.audioTimelineRepository
      .createQueryBuilder('timeline')
      .leftJoinAndSelect('timeline.stream', 'stream')
      .where('stream.id = :streamId', { streamId })
      .getMany();
    // return this.audioTimelineRepository.findOneBy({ id });
  }

  async findAll(): Promise<AudioTimeline[]> {
    return this.audioTimelineRepository.find({ take: 30, skip: 0 });
  }

  async addTrackToTimeline(
    audioTimeline: AudioTimeline,
    addTrackToTimeline: AddTrackToTimelineDTO,
  ) {
    // insert at the end
    const timelineStartAt = await this.getLastTimelineEvent(audioTimeline);

    await this.trackService.create(audioTimeline, {
      track: addTrackToTimeline.trackId,
      timelineStartAt: timelineStartAt,
    });
    return this.findOne(audioTimeline.id);
  }

  async getLastTimelineEvent(timeline: AudioTimeline): Promise<number> {
    const { tracks } = timeline;

    const events: number[] = tracks.map((track) => {
      return track.timelineStartAt + track.duration;
    });
    return Math.max(...events);
  }

  // async getTimelineByStream(id: number): Promise<Timeline[]> {
  //   return this.audioTimelineRepository.find({
  //     where: {
  //       stream: id,
  //     },
  //   });
  //   // return audioTimeline;
  // }
}
