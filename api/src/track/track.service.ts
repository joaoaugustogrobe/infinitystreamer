import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackProvider } from './interfaces/track-provider.interface.ts';
import { UpbeatProvider } from './providers/upbeat.provider';

@Injectable()
export class TrackService {
  private readonly trackProvider: TrackProvider;

  constructor() {
    this.trackProvider = new UpbeatProvider(); // Use the SpotifyProvider implementation
  }

  getTrends(): Promise<Track[]> {
    return this.trackProvider.getTrends();
  }

  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  findAll() {
    return `This action returns all track`;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
