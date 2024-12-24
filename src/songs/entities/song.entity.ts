import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema({ timestamps: true })
export class Song {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  audio: string;

  @Prop({ required: true })
  genre: string;

  @Prop()
  lyrics: string;

  @Prop()
  album: string;

  @Prop()
  artists: [string];
}

export const SongSchema = SchemaFactory.createForClass(Song);
