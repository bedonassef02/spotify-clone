import { Body, Controller } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {
  }

  @Prop('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }
}
