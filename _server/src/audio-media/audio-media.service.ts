import { Injectable } from '@nestjs/common';
import { AudioMediaProvider } from './interfaces/audio-media-provider.interface';
import { AudioMediaItem } from './interfaces/audio-media-item.interface';
import { UpbeatProvider } from './providers/upbeat.provider';

@Injectable()
export class AudioMediaService {
  private readonly provider: AudioMediaProvider;

  constructor() {
    this.provider = new UpbeatProvider(); // Use the SpotifyProvider implementation
  }

  async getTrends(): Promise<AudioMediaItem[]> {
    return this.provider.getTrends();
  }
}
