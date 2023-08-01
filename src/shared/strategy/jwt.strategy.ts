import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ApplicationConfig } from '@/config/application.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ApplicationConfig.auth.tokenSecretKey,
    });
  }

  async validate(payload: { id: string; roles: string[] }) {
    return { userId: payload.id, roles: payload.roles };
  }
}
