import { Track } from '../entities/track.entity';

export interface TrackProvider {
  getTrends(): Promise<Track[]>;
  // getSongById(id: string): Promise<Track | null>;
  // searchByKeyword(keyword: string): Promise<Track[]>;
  // listSongsFromArtist(artistId: string): Promise<Track[]>;
}
