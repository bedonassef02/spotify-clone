import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlbumDocument = HydratedDocument<Album>;

@Schema({ timestamps: true })
export class Album {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  releaseDate: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
