import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreatePlaylistDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsBoolean()
  isPublic: boolean;

  @IsOptional()
  @IsMongoId({ each: true })
  songs: [String];

  owner: User;
}
