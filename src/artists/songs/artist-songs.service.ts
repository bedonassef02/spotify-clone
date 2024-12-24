import { Injectable, Logger, Post } from '@nestjs/common';
import { SongsService } from '../../songs/songs.service';
import { AddToArtistDto } from './dto/add-to-artist.dto';
import { ArtistsService } from '../artists.service';
import { ArtistDocument } from '../entities/artist.entity';
import { SongDocument } from '../../songs/entities/song.entity';

@Injectable()
export class ArtistSongsService {
  private logger: Logger = new Logger(ArtistSongsService.name);

  constructor(
    private readonly songsService: SongsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Post()
  async add(artistDto: AddToArtistDto): Promise<void> {
    const song: SongDocument = await this.songsService.findOne(artistDto.song);
    const artist: ArtistDocument = await this.artistsService.findOne(
      artistDto.id,
    );
    artist.songs.push(song);
    await artist.save();
  }
}
