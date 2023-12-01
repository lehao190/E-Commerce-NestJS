import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './inputs/auth.inputs';
import { JwtDecodedPayload, JwtPayload, TAuth, TAuthWithoutUser } from './types/auth.types';
import { TUser } from 'src/users/types/user.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Check for valid refresh token
  async checkIfRefreshTokenValid(
    refreshToken: string,
    payload: JwtPayload,
  ): Promise<JwtPayload> {
    const user = await this.usersService.findOne(payload.userId);

    if (!user) throw new NotFoundException();

    if (!user.refresh_token) throw new ForbiddenException();

    if (refreshToken === user.refresh_token) {
      return payload = {
        email: payload.email,
        userId: payload.userId,
        username: payload.username,
      };
    } else {
      // Remove refresh token from database if detected invalidated refresh token
      await this.usersService.update(payload.userId, {
        refresh_token: null,
      });

      throw new ForbiddenException();
    }
  }

  // Generate access and refresh tokens
  async generateTokensPair(payload: JwtPayload): Promise<TAuthWithoutUser> {
    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          ...payload,
        },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
        },
      ),
      this.jwtService.signAsync(
        {
          ...payload,
        },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES'),
        },
      ),
    ]);

    await this.usersService.update(payload.userId, {
      refresh_token: refreshToken,
    });

    const decodedPayload = this.jwtService.decode(accessToken) as JwtDecodedPayload;

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: decodedPayload.exp,
    };
  }

  // Check if user exists
  async validateUser(email: string, password: string): Promise<TUser> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException();

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new ForbiddenException();

    if (user && isPasswordMatch) return user;

    return null;
  }

  async login(user: TUser): Promise<TAuth> {
    const payload = {
      email: user.email,
      userId: user.id,
      username: user.username,
    };
    const tokens = await this.generateTokensPair(payload);

    return {
      user,
      ...tokens,
    };
  }

  async register(data: RegisterInput): Promise<TUser> {
    const user = await this.usersService.findByEmail(data.email);
    if (user) throw new ConflictException();

    return this.usersService.create(data);
  }

  async logout(id: number) {
    await this.usersService.update(id, {
      refresh_token: null,
    });

    return {
      message: 'Logout Successfully!',
    };
  }
}
