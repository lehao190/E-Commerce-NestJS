import { Injectable } from '@nestjs/common';
import { ICrudBase } from 'src/common/interfaces/crud-base.interface';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterInput } from 'src/auth/inputs/auth.inputs';
import { TPrismaUser, TUser } from './types/user.types';

@Injectable()
export class UsersService implements ICrudBase<TPrismaUser>{
  constructor(private prisma: PrismaService) {}

  async create(data: RegisterInput): Promise<TPrismaUser> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword
      }
    });
  }

  async getAll(): Promise<TPrismaUser[] | []> {
    return this.prisma.user.findMany();
  }

  async findOne(
    id: number
  ): Promise<TPrismaUser | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async findByEmail(
    email: string
  ): Promise<TPrismaUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async update(id: number, data: Partial<TUser>): Promise<TPrismaUser | null> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      }
    });
  }
}
