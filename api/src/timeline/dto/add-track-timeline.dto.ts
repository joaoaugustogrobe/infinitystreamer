import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class AddTrackToTimelineDTO {
  @ApiProperty({
    description: 'Track of the ID to be added',
  })
  public readonly trackId: string;
}
