import { IsDateString, IsMongoId, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  title: string;
  @IsString()
  image: string;
  @IsMongoId()
  artist: string;
  @IsDateString()
  releaseDate: Date;
}
