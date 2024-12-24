import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { Playlist, PlaylistSchema } from './entities/playlist.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}