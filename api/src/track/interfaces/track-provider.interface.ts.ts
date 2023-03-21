import { Track } from '../entities/track.entity';

export interface TrackProvider {
  getTrends(): Promise<Track[]>;
  // getTrackById(id: string): Promise<Track | null>;
  // searchByKeyword(keyword: string): Promise<Track[]>;
  // listSongsFromArtist(artistId: string): Promise<Track[]>;
}
