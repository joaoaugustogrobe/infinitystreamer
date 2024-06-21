import { Track } from '../entities/track.entity';
import { TrackProvider } from '../interfaces/track-provider.interface.ts';
import axios from 'axios';
import { NotFoundException } from '@nestjs/common';

export class UpbeatProvider implements TrackProvider {
  async getTrends(): Promise<Track[]> {
    const endpoint =
      'https://fastly-y.uppbeat.io/api/admin/trending/view-more/top-downloads/tracks/free/0';
    try {
      const response = await axios.get(endpoint);
      const data = response.data?.top_downloads_tracks_free;

      const tracks: Track[] = data.map((item: any) => ({
        id: `upbeat:${item.contributor.slug}:${item.slug}`,
        title: item.name,
        duration: item.asset_specific_data.length,
        thumbnail: item.image,
        resourceUrl: item.asset_specific_data.preview_url,
        timelineStartAt: -1,
        artistName: item.contributor.name,
        resourceOrigin: 'upbeat',
      }));
      return tracks;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getNewTrackById(id: string): Promise<Track | null> {
    const [_trackProviderName, artist, trackId] = id.split(':');
    const endpoint = `https://fastly-y.uppbeat.io/api/tracks/${artist}/artists/${trackId}/track`;

    try {
      const response = await axios.get(endpoint);
      const item = response.data;
      if (!item || item == 'false') {
        throw new NotFoundException('TEST!');
      }

      const track: Track = {
        id: `upbeat:${item.artist.slug}:${item.slug}`,
        title: item.name,
        duration: item.track_version[0].version_length,
        thumbnail: item.artist.avatar_image.image_aws_url,
        resourceUrl: item.track_version[0].version_preview_uri,
        timelineStartAt: -1,
        artistName: item.artist.name,
        resourceOrigin: 'upbeat',
        timeline: null,
        waveform: item.track_version[0].waveform_json,
      };
      return track;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
