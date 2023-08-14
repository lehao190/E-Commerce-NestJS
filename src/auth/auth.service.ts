import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './auth.types';
import { handlePromise } from 'src/common/utils/handle-promises';
import { RegisterInput } from './auth.inputs';

export const jwtConstants = {
  secret: 'Secret JWT'
} 

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const [user] = await handlePromise(this.usersService.findByEmail(email));
    const [isPasswordMatch] = await handlePromise<boolean>(bcrypt.compare(pass, user.password));

    if (user && isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: 1 } as JwtPayload;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: RegisterInput) {
    return this.usersService.create(data);
  }

  async logout() {
    return
  }
}
