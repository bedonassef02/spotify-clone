import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsNumber()
  @Min(0.1)
  duration: number;

  @IsDateString()
  releaseDate: Date;

  @IsString()
  image: string;

  @IsString()
  audio: string;

  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  lyrics: string;

  @IsOptional()
  @IsMongoId()
  album: string;

  @IsMongoId({ each: true })
  artists: [string];
}
