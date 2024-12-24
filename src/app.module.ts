import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { IamModule } from './iam/iam.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, DatabaseModule, IamModule, ArtistsModule],
})
export class AppModule {}
