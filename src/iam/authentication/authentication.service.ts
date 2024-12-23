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

@Injectable()
export class AuthenticationService {
  private logger: Logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<UserDocument> {
    const user: UserDocument | null = await this.usersService.findByEmail(
      signInDto.email,
    );

    if (!user) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    if (!(await this.isSamePassword(signInDto.password, user.password))) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<UserDocument | null> {
    const user: UserDocument | null = await this.usersService.findByEmail(
      signUpDto.email,
    );

    if (user) {
      throw new ConflictException('User already exists');
    }
    signUpDto.password = await this.hashingService.hash(signUpDto.password);

    return this.usersService.create(signUpDto);
  }

  private async isSamePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return this.hashingService.compare(password, userPassword);
  }
}
