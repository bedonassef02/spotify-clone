import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from './entities/song.entity';
import { Model } from 'mongoose';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<SongDocument>,
  ) {}
  create(createSongDto: CreateSongDto): Promise<SongDocument> {
    return this.songModel.create(createSongDto);
  }

  findAll(): Promise<SongDocument[]> {
    return this.songModel.find();
  }

  findOne(id: string): Promise<SongDocument> {
    return this.songModel.findById(id);
  }

  update(id: string, updateSongDto: UpdateSongDto): Promise<SongDocument> {
    return this.songModel.findByIdAndUpdate(id, updateSongDto);
  }

  async remove(id: string): Promise<void> {
    await this.songModel.findByIdAndDelete(id);
  }
}
