import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './entities/artist.entity';
import { SongsModule } from '../songs/songs.module';
import { ArtistSongsController } from './songs/artist-songs.controller';
import { ArtistSongsService } from './songs/artist-songs.service';

@Module({
  imports: [
    SongsModule,
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [ArtistsController, ArtistSongsController],
  providers: [ArtistsService, ArtistSongsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
