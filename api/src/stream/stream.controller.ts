import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { ApiTags } from '@nestjs/swagger';
import { Stream } from './entities/stream.entity';
import { TimelineService } from 'src/timeline/timeline.service';
import { ListQueryDto } from 'src/dto/list-query.dto';
import { PaginatedList } from 'src/objects/paginated-list.object';

@Controller('stream')
@ApiTags('Stream')
export class StreamController {
  constructor(
    private readonly streamService: StreamService,
    private readonly timelineService: TimelineService,
  ) {}

  @Post()
  create(@Body() createStreamDto: CreateStreamDto): Promise<Stream> {
    // return this.streamService.create(createStreamDto);
    return this.streamService.createStreamAndTimelines(createStreamDto);
  }

  @Get('all')
  findAll(
    @Query() { take, skip }: ListQueryDto,
  ): Promise<PaginatedList<Stream>> {
    return this.streamService.findAllPaginated(take, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStreamDto: UpdateStreamDto) {
    return this.streamService.update(+id, updateStreamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streamService.remove(+id);
  }
}
