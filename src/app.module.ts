import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { IamModule } from './iam/iam.module';
import { StreamModule } from './stream/stream.module';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, DatabaseModule, IamModule, ArtistsModule, StreamModule, SongsModule],
})
export class AppModule {}
