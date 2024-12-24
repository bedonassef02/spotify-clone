import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Song } from '../../songs/entities/song.entity';
import { User } from '../../users/entities/user.entity';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true })
export class Playlist {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop([{ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' } }])
  songs: [Song];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
