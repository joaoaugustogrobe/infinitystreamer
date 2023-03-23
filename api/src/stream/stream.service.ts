import { Injectable } from '@nestjs/common';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { CreateStreamDto } from './dto/create-stream.dto';
import { Stream } from './entities/stream.entity';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackService } from '../track/track.service';
import { CreateInitialTrackDto } from '../track/dto/create-initial-track.dto';
import { TimelineService } from 'src/timeline/timeline.service';
import { PaginatedList } from '../objects/paginated-list.object';
import { Timeline } from 'src/timeline/entities/timeline.entity';

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

  async findAll(take = 30, skip = 0): Promise<Stream[]> {
    return await this.streamRepository.find({
      take,
      skip,
    });
  }
  async findAllPaginated(take = 30, skip = 0): Promise<PaginatedList<Stream>> {
    const total = await this.streamRepository.count();
    const data = await this.findAll(take, skip);
    console.log('data', data);
    return new PaginatedList<Stream>(data, total, take, skip);
  }

  async findOne(id: number) {
    const stream = await this.streamRepository.findOne({
      where: { id },
      relations: ['audioTimelines', 'videoTimelines'],
    });
    return stream;
  }

  update(id: number, updateStreamDto: UpdateStreamDto) {
    return `This action updates a #${id} stream`;
  }

  remove(id: number) {
    return `This action removes a #${id} stream`;
  }
}
