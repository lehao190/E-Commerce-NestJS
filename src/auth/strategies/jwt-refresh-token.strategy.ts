import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types/auth.types';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token-strategy') {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    const authHeader = request.headers?.authorization.split('Bearer ');
    const refreshToken = authHeader[1];
    
    // function exclude(user, keys){ 
    //   return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key))
    // )}
    
    // const newPayload = exclude(payload, ['iat', 'exp']) as JwtPayload;

    if(refreshToken)
      return await this.authService.checkIfRefreshTokenValid(refreshToken, payload);

    throw new UnauthorizedException();
  }
}
