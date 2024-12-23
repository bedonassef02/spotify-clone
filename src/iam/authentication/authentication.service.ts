import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService,
              private jwtService: JwtService) {
  }

  signUp(signUpDto: SignUpDto) {
    const user = this.usersService.findByEmail(signUpDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return this.usersService.create(signUpDto);
  }
}
