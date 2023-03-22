import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Track id',
  })
  public readonly track: string;

  @ApiProperty({
    description: 'Second where the track will start',
  })
  public readonly timelineStartAt: number;
}
