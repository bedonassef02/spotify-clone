import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { IamModule } from './iam/iam.module';
import { StreamModule } from './stream/stream.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [UsersModule, DatabaseModule, IamModule, StreamModule, SongsModule],
})
export class AppModule {}
