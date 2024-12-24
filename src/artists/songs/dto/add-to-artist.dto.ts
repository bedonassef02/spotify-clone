import { IsMongoId } from 'class-validator';

export class AddToArtistDto {
  id: string;

  @IsMongoId()
  song: string;
}
