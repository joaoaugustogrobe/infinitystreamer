import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  Res,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateInitialTrackDto } from './dto/create-initial-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import axios from 'axios';
import { Readable, pipeline } from 'stream';
import { Response } from 'express';

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

  @Get()
  async proxy(@Query('url') url: string, @Res() res: Response) {
    // TODO - Refactor when we start storing the track files.
    // For now it will use a proxy for avoiding CORS
    // if (!url.startsWith('https://cdn.uppbeat.io/')) {
    //   throw new HttpException('Invalid URL', 400);
    // }

    const request = await fetch(url);

    const reader = request.body.getReader();
    function readStream() {
      reader.read().then(({ done, value }) => {
        if (done) {
          console.log('Stream closed');
          res.end();
          return;
        }
        res.write(value);
        readStream();
      });
    }
    readStream();

    // return request.body.pipeTo(res.write());
    // res.write(request.body);
  }

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
