import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';

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
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
