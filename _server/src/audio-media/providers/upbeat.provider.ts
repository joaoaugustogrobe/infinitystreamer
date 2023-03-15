import { AudioMediaProvider } from '../interfaces/audio-media-provider.interface';
import { AudioMediaItem } from '../interfaces/audio-media-item.interface';
import { Artist } from '../interfaces/artist.interface';
import axios from 'axios';

export class UpbeatProvider implements AudioMediaProvider {
  // Implement the methods from the AudioMediaProvider interface
  async getTrends(): Promise<AudioMediaItem[]> {
    const endpoint =
      'https://fastly.uppbeat.io/api/tracks/all/types/1/ids/0/energies/0/vocals/Trending/sorts/0/durations/[]/stylefilters/-1/limits/[]/excludes/0/premium/0/freeonly/1';
    try {
      const response = await axios.get(endpoint);
      const tracks = response.data.results;

      // Map the response data to an array of MediaItem objects
      const mediaItems: [AudioMediaItem] = tracks.map((item: any) => ({
        id: item.id.toString(),
        title: item.name,
        artist: mapArtist(item.artist),
        duration: item.precise_duration,
        thumbnail: item.artist.avatar_image.image_aws_url,
        url: item.track_url.version_preview_uri,
      }));

      return mediaItems;
    } catch (error) {
      throw new Error(
        `Failed to retrieve trending media items: ${error.message}`,
      );
    }
  }

  // async getSongById(id: string): Promise<AudioMediaItem | null> {
  //   // Implementation for getting a song by ID from Spotify API
  // }

  // async searchByKeyword(keyword: string): Promise<AudioMediaItem[]> {
  //   // Implementation for searching for media items by keyword from Spotify API
  // }

  // async listSongsFromArtist(artistId: string): Promise<AudioMediaItem[]> {
  //   // Implementation for listing songs from an artist from Spotify API
  // }

  // async searchArtist(keyword: string): Promise<Artist[]> {
  //   // Implementation for searching for artists by keyword from Spotify API
  // }

  // async getArtist(artistId: string): Promise<Artist | null> {
  //   // Implementation for getting an artist by ID from Spotify API
  // }
}

function mapArtist(artist: any): Artist {
  return {
    id: artist.id.toString(),
    name: artist.name,
    image: artist.avatar_image.image_aws_url,
    url: '',
  };
}
