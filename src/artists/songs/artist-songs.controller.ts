import { Body, Controller, Param, Post } from '@nestjs/common';
import { ArtistSongsService } from './artist-songs.service';
import { AddToArtistDto } from './dto/add-to-artist.dto';

@Controller('artists/:artist/songs')
export class ArtistSongsController {
  constructor(private readonly songsService: ArtistSongsService) {}

  // TODO: CRUD

  @Post()
  add(
    @Param('artist') artist: string,
    @Body() artistDto: AddToArtistDto,
  ): Promise<void> {
    artistDto.id = artist;
    return this.songsService.add(artistDto);
  }
}
