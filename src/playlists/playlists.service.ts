import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist } from './entities/playlist.entity';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name) private readonly playlistModel: Model<Playlist>,
  ) {}

  create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistModel.create(createPlaylistDto);
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistModel.find();
  }

  async findOne(id: string): Promise<Playlist> {
    const playlist: Playlist | null = await this.playlistModel.findById(id);
    if (playlist) {
      return playlist;
    }
    throw new NotFoundException(`Playlist with id ${id} not found`);
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    return this.playlistModel.findByIdAndUpdate(id, updatePlaylistDto);
  }

  async remove(id: string): Promise<void> {
    await this.playlistModel.findByIdAndDelete(id);
  }
}
