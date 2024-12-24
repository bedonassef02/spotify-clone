import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongDocument } from './entities/song.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<SongDocument> {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(): Promise<SongDocument[]> {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SongDocument> {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<SongDocument> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.songsService.remove(id);
  }
}
