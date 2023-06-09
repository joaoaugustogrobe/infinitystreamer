import { Stream } from '../../stream/entities/stream.entity';
// import { Track } from '../../track/entities/track.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export abstract class Timeline {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'createdAt' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  public updatedAt: Date;
}

@Entity()
export class AudioTimeline extends Timeline {
  @OneToMany(() => Track, (tracks) => tracks.timeline, { eager: true })
  public tracks: Track[];

  @ManyToOne(() => Stream, (stream) => stream.audioTimelines)
  public stream: Stream;
}

// Video handling
@Entity()
export class VideoTimeline extends Timeline {
  @Column({ default: 0 })
  public layer: number;

  @Column({ default: '1920x1080' })
  public resolution: string;

  @Column({ default: '30fps' })
  public framerate: string;

  @ManyToOne(() => Stream, (stream) => stream.videoTimelines)
  public stream: Stream;

  // @OneToMany(() => Clip, (clip) => clip.timeline)
  // public clips: Clip[];
}

@Entity()
export abstract class Resource {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  public title: string;

  @Column()
  public duration: number;

  @Column()
  public timelineStartAt: number;

  @Column()
  public thumbnail: string;

  @Column()
  public resourceUrl: string;

  @Column()
  public artistName: string;

  @Column()
  public resourceOrigin: string;
}

@Entity()
export class Track extends Resource {
  @ManyToOne(() => AudioTimeline, (timeline) => timeline.tracks, {
    nullable: true,
  })
  public timeline: AudioTimeline;

  @Column({ nullable: true })
  public waveform: string;
}
// Clip with VideoTimeline should be n*n, but we are not storing the Clip,
// we are getting it directly from the provider source.
// Refactor it in the future. Same for Track and AudioTimeline
// @Entity()
// export class Clip extends Resource {
//   @ManyToOne(() => VideoTimeline, (timeline) => timeline.clips)
//   public timeline: VideoTimeline;
// }
