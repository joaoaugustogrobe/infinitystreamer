import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateInitialTrackDto } from './dto/create-initial-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
@ApiTags('Tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('trends')
  async getTrends(): Promise<Track[]> {
    return this.trackService.getTrends();
  }

  @Post()
  createInitialTrack(@Body() createTrackDto: CreateInitialTrackDto) {
    return this.trackService.createInitialTrack(createTrackDto);
  }

  // @Get()
  // findAll() {
  //   return this.trackService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.trackService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
  //   return this.trackService.update(+id, updateTrackDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.trackService.remove(+id);
  // }
}
