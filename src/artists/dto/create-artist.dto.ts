import { IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;
  @IsString()
  image: string;
  @IsOptional()
  @IsString()
  bio: string;
  @IsString({ each: true })
  genres: [string];
}
