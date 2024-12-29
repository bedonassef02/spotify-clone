import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../../users/entities/user.entity';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { randomUUID } from 'crypto';
import { Tokens } from '../interfaces/tokens.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async generate(user: UserDocument): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.sign(user._id.toString(), this.jwtConfiguration.accessTokenTtl, {
        email: user.email,
        // TODO: add roles and permissions
      }),
      this.sign(user._id.toString(), this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId: randomUUID(),
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async sign<T>(
    userId: string,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  verify(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token);
    }catch (e) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
