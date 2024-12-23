import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('authentication')
export class AuthenticationController {
  private logger: Logger = new Logger(AuthenticationController.name);
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authenticationService.signIn(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }
}
