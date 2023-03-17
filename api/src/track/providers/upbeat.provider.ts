import { Track } from '../entities/track.entity';
import { TrackProvider } from '../interfaces/track-provider.interface.ts';
import axios from 'axios';

export class UpbeatProvider implements TrackProvider {
  async getTrends(): Promise<Track[]> {
    const endpoint =
      'https://fastly.uppbeat.io/api/tracks/all/types/1/ids/0/energies/0/vocals/Trending/sorts/0/durations/[]/stylefilters/-1/limits/[]/excludes/0/premium/0/freeonly/1';
    try {
      const response = await axios.get(endpoint);
      const data = response.data;

      const tracks: Track[] = data.results.map((item: any) => ({
        id: item.id.toString(),
        title: item.name,
        duration: item.duration,
        thumbnail: item.artist.avatar_image.image_aws_url,
        resourceUrl: item.play_url,
        timelineStartAt: -1,
        artistName: item.artist.name,
        resourceOrigin: 'upbeat',
      }));
      return tracks;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
