import { ApplicationConfig } from '@/config/application.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenManagerService {
  private readonly tokenSecretKey: string;
  private readonly accessTokenExpired: number;
  private readonly refreshTokenExpired: number;

  constructor(private jwtService: JwtService) {
    this.tokenSecretKey = ApplicationConfig.auth.tokenSecretKey;
    this.accessTokenExpired = ApplicationConfig.auth.accessTokenExpired || 3600;
    this.refreshTokenExpired =
      ApplicationConfig.auth.refreshTokenExpired || 604800;
  }

  generateToken(data: { userId: number; roles: string[] }): {
    accessToken: string;
    refreshToken: string;
  } {
    const { userId, roles } = data || {};
    const payload = { id: userId, roles: roles.join(',') };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.tokenSecretKey,
      expiresIn: this.accessTokenExpired,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.tokenSecretKey,
      expiresIn: this.refreshTokenExpired,
    });
    return { accessToken, refreshToken };
  }

  verifyToken(token: string): boolean {
    return !!this.jwtService.verify(token, { secret: this.tokenSecretKey });
  }
}
