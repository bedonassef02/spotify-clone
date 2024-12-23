import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(8, 20)
  password: string;
}