import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInitialTrackDto } from './dto/create-initial-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackProvider } from './interfaces/track-provider.interface.ts';
import { UpbeatProvider } from './providers/upbeat.provider';

@Injectable()
export class TrackService {
  private readonly trackProvider: TrackProvider;

  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {
    this.trackProvider = new UpbeatProvider(); // Use the SpotifyProvider implementation
  }

  getTrends(): Promise<Track[]> {
    return this.trackProvider.getTrends();
  }

  // create(createTrackDto: CreateTrackDto): Promise<Track> {
  //   const track = this.trackRepository.create({});
  //   return this.trackRepository.save(track);
  // }

  createInitialTrack(createTrackDto: CreateInitialTrackDto): Promise<Track> {
    const track = this.trackRepository.create({
      timeline: createTrackDto.timeline,
      waveform: '',
      title: 'Welcome',
      duration: 11,
      timelineStartAt: 0,
      thumbnail: '',
      resourceUrl:
        'https://infinitystreamer.s3.amazonaws.com/Static/success.mp3',
      artistName: 'InfinityStreamer',
      resourceOrigin: 'InfinityStreamer',
    });
    return this.trackRepository.save(track);
  }

  // findAll() {
  //   return `This action returns all track`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} track`;
  // }

  // update(id: number, updateTrackDto: UpdateTrackDto) {
  //   return `This action updates a #${id} track`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} track`;
  // }
}
