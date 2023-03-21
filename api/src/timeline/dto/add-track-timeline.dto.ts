import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class AddTrackToTimelineDTO {
  @ApiProperty({
    description: 'Stream ID',
  })
  public readonly stream: number;
}
