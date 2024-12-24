import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './entities/album.entity';
import { Model } from 'mongoose';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
    private readonly artistsService: ArtistsService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    await this.artistsService.findOne(createAlbumDto.artist);
    return this.albumModel.create(createAlbumDto);
  }

  findAll(): Promise<Album[]> {
    return this.albumModel.find();
  }

  findOne(id: string): Promise<Album> {
    return this.albumModel.findById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    if (updateAlbumDto.artist) {
      await this.artistsService.findOne(updateAlbumDto.artist);
    }
    return this.albumModel.findByIdAndUpdate(id, updateAlbumDto);
  }

  async remove(id: string): Promise<void> {
    await this.albumModel.findByIdAndDelete(id);
  }
}
