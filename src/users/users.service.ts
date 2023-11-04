import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { ICrudBase } from 'src/common/interfaces/crud-base.interface';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterInput } from 'src/auth/inputs/auth.inputs';
import { TUser } from './types/user.types';

@Injectable()
export class UsersService implements ICrudBase<User>{
  constructor(private prisma: PrismaService) {}
  
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

  async create(data: RegisterInput): Promise<TUser> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword
      }
    });
  }

  async getAll() {
    return this.users
  }

  async findOne(
    id: number
  ): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    return user;
  }

  async findByEmail(
    email: string
  ): Promise<TUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async update(id: string, data: unknown) {
    return this.users[1]
  }

  async delete() {
    return
  }
}
