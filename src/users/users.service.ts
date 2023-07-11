import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      email: 'john@gmail.com',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      email: 'maria@gmail.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
