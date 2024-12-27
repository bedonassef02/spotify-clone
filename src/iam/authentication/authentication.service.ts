import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../../users/users.service';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserDocument } from '../../users/entities/user.entity';
import { TokenService } from '../services/token.service';
import { Tokens } from '../interfaces/tokens.interface';

@Injectable()
export class AuthenticationService {
  private logger: Logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<Tokens> {
    const user: UserDocument | null = await this.usersService.findByEmail(
      signInDto.email,
    );

    if (
      !user ||
      !(await this.isSamePassword(signInDto.password, user.password))
    ) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    return this.tokenService.generate(user);
  }

  async signUp(signUpDto: SignUpDto): Promise<Tokens> {
    const user: UserDocument | null = await this.usersService.findByEmail(
      signUpDto.email,
    );

    if (user) {
      throw new ConflictException('User already exists');
    }
    signUpDto.password = await this.hashingService.hash(signUpDto.password);

    return this.tokenService.generate(
      await this.usersService.create(signUpDto),
    );
  }

  private async isSamePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return this.hashingService.compare(password, userPassword);
  }
}
