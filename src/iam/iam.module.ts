import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: HashingService,
      useClass: BcryptService
    }
  ],
})
export class IamModule {
}
