import { Injectable } from '@nestjs/common';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { CreateStreamDto } from './dto/create-stream.dto';
import { Stream } from './entities/stream.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackService } from '../track/track.service';
import { CreateInitialTrackDto } from '../track/dto/create-initial-track.dto';
import { TimelineService } from 'src/timeline/timeline.service';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream) private streamRepository: Repository<Stream>,
    private readonly timelineService: TimelineService,
    private readonly trackService: TrackService,
  ) {}

  create(createStreamDto: CreateStreamDto): Promise<Stream> {
    const stream = this.streamRepository.create({
      title: createStreamDto.title,
      description: createStreamDto.description,
    });

    return this.streamRepository.save(stream);
  }

  async createStreamAndTimelines(
    createStreamDto: CreateStreamDto,
  ): Promise<Stream> {
    const stream = await this.streamRepository.save({ ...createStreamDto });

    const timelines = await Promise.all([
      this.timelineService.createAudioTimeline(stream),
    ]);
    const audioTimeline = timelines[0];
    const initialTrack: CreateInitialTrackDto = {
      timeline: audioTimeline,
    };

    await this.trackService.createInitialTrack(initialTrack);

    return stream;
  }

  findAll() {
    return `This action returns all stream`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stream`;
  }

  update(id: number, updateStreamDto: UpdateStreamDto) {
    return `This action updates a #${id} stream`;
  }

  remove(id: number) {
    return `This action removes a #${id} stream`;
  }
}
