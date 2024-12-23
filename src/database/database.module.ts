import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    MongooseModule.forRootAsync(databaseConfig.asProvider())
  ],
})

export class DatabaseModule {}
