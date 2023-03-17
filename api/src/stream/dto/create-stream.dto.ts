import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateStreamDto {
  @ApiProperty({
    description: 'Title of stream.',
  })
  @Length(6, 120)
  public readonly title: string;

  @ApiProperty({
    description: 'Optional description for stream.',
  })
  @Length(0, 120)
  public readonly description: string;
}
