import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stream } from '../../stream/entities/stream.entity';

@Entity()
export abstract class Timeline {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Stream, (stream) => stream.timelines)
  stream: Stream;
}
