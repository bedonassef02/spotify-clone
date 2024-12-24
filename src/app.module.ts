import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [UsersModule, DatabaseModule, IamModule],
})
export class AppModule {}
