import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import {
  AudioTimeline,
  VideoTimeline,
} from '../../timeline/entities/timeline.entity';

@Entity()
export class Stream {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  public thumbnailURL: string;

  @OneToMany(() => VideoTimeline, (timeline) => timeline.stream)
  public videoTimelines: VideoTimeline[];

  @OneToMany(() => AudioTimeline, (timeline) => timeline.stream)
  public audioTimelines: AudioTimeline[];

  @CreateDateColumn({ name: 'createdAt' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  public updatedAt: Date;
}
