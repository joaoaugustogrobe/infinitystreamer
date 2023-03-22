import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    description: 'Page size for the listing',
    required: false,
  })
  public readonly take: number = 30;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: 'integer',
    minimum: 0,
    description: 'Page position for the listing',
    required: false,
  })
  public readonly skip: number = 0;
}
