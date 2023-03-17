import { Injectable } from '@nestjs/common';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { CreateStreamDto } from './dto/create-stream.dto';
import { Stream } from './entities/stream.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  VideoTimeline,
  AudioTimeline,
} from 'src/timeline/entities/timeline.entity';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream) private streamRepository: Repository<Stream>,
    @InjectRepository(VideoTimeline)
    private videoTimelineRepository: Repository<VideoTimeline>,
    @InjectRepository(AudioTimeline)
    private audioTimelineRepository: Repository<AudioTimeline>,
  ) {}

  create(createStreamDto: CreateStreamDto): Promise<Stream> {
    const stream = this.streamRepository.create({
      title: createStreamDto.title,
      description: createStreamDto.description,
    });

    return this.streamRepository.save(stream);
    // return 'This action adds a new stream';
  }

  async createStreamAndTimelines(
    createStreamDto: CreateStreamDto,
  ): Promise<Stream> {
    const stream = await this.streamRepository.save({ ...createStreamDto });

    await Promise.all([
      this.videoTimelineRepository.save({}),
      this.audioTimelineRepository.save({}),
    ]);

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
