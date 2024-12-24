import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { IamModule } from './iam/iam.module';
import { StreamModule } from './stream/stream.module';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    IamModule,
    ArtistsModule,
    StreamModule,
    SongsModule,
    PlaylistsModule,
  ],
})
export class AppModule {}
