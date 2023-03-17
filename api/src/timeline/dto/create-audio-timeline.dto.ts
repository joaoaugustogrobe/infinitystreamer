import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateStreamDto {
  @ApiProperty({
    description: 'Stream ID',
  })
  public readonly stream: number;
}
