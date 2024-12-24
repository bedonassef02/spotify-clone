import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Song } from '../../songs/entities/song.entity';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({ timestamps: true })
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop()
  bio: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  genres: [String];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  followers: [User];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }])
  songs: [Song];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
