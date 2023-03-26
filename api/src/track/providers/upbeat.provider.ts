import { Track } from '../entities/track.entity';
import { TrackProvider } from '../interfaces/track-provider.interface.ts';
import axios from 'axios';
import { NotFoundException } from '@nestjs/common';

export class UpbeatProvider implements TrackProvider {
  async getTrends(): Promise<Track[]> {
    const endpoint =
      'https://fastly.uppbeat.io/api/tracks/all/types/1/ids/0/energies/0/vocals/Trending/sorts/0/durations/[]/stylefilters/-1/limits/[]/excludes/0/premium/0/freeonly/1';
    try {
      const response = await axios.get(endpoint);
      const data = response.data;

      const tracks: Track[] = data.results.map((item: any) => ({
        id: `upbeat:${item.artist.slug}:${item.slug}`,
        title: item.name,
        duration: item.track_url.version_length,
        thumbnail: item.artist.avatar_image.image_aws_url,
        resourceUrl: item.track_url.version_preview_uri,
        timelineStartAt: -1,
        artistName: item.artist.name,
        resourceOrigin: 'upbeat',
      }));
      return tracks;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getNewTrackById(id: string): Promise<Track | null> {
    console.log('id', id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_trackProviderName, artist, trackId] = id.split(':');
    const endpoint = `https://fastly.uppbeat.io/api/tracks/${artist}/artists/${trackId}/track`;

    try {
      const response = await axios.get(endpoint);
      const item = response.data;
      if (!item || item == 'false') {
        throw new NotFoundException('TEST!');
      }

      const track: Track = {
        id: `upbeat:${item.artist.slug}:${item.slug}`,
        title: item.name,
        duration: item.track_url.version_length,
        thumbnail: item.artist.avatar_image.image_aws_url,
        resourceUrl: item.track_url.version_preview_uri,
        timelineStartAt: -1,
        artistName: item.artist.name,
        resourceOrigin: 'upbeat',
        timeline: null,
        waveform: item.track_url.waveform_json,
      };
      return track;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
