// import {
//   Resource,
//   AudioTimeline,
// } from '../../timeline/entities/timeline.entity';
// import { Entity, Column, ManyToOne } from 'typeorm';

// @Entity()
// export class Track extends Resource {
//   @ManyToOne(() => AudioTimeline, (timeline) => timeline.tracks)
//   public timeline: AudioTimeline;

//   @Column({ nullable: true })
//   public waveform: string;
// }

// Avoid circular dependencies
export { Track } from '../../timeline/entities/timeline.entity';
