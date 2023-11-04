import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { handlePromise } from 'src/common/utils/handle-promises';
import { LoginInput, RegisterInput } from './inputs/auth.inputs';
import { TAuth } from './types/auth.types';
import { TUser } from 'src/users/types/user.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<TUser> {
    const [user] = await handlePromise(this.usersService.findByEmail(email));
    const [isPasswordMatch] = await handlePromise<boolean>(bcrypt.compare(pass, user.password));

    if (user && isPasswordMatch) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginInput): Promise<TAuth> {
    const payload = { email: user.email, userId: 1 };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: RegisterInput): Promise<TUser> {
    return this.usersService.create(data);
  }

  async logout() {
    return
  }
}
