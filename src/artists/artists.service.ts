import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artist } from './entities/artist.entity';
import { Model } from 'mongoose';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectModel(Artist.name) private readonly artistModel: Model<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistModel.create(createArtistDto);
  }

  findAll(): Promise<Artist[]> {
    return this.artistModel.find();
  }

  findOne(id: string): Promise<Artist> {
    return this.artistModel.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistModel.findByIdAndUpdate(id, updateArtistDto);
  }

  async remove(id: string): Promise<void> {
    await this.artistModel.findByIdAndDelete(id);
  }
}
