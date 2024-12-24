import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from './entities/artist.entity';
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

  async findOne(id: string): Promise<ArtistDocument> {
    const artist: ArtistDocument | null = await this.artistModel.findById(id);
    if (artist) {
      return artist;
    }
    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistModel.findByIdAndUpdate(id, updateArtistDto);
  }

  async remove(id: string): Promise<void> {
    await this.artistModel.findByIdAndDelete(id);
  }
}
