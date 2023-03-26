import { ApiProperty } from '@nestjs/swagger';
import { Length, Matches } from 'class-validator';

export class AddTrackToTimelineDTO {
  @ApiProperty({
    description: 'Track of the ID to be added',
  })
  // @Matches(/[a-zA-Z-]{1,}:[a-zA-Z-]{1,}:[a-zA-Z-]{1,}/)
  public readonly trackId: string;
}
