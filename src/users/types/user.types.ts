import { User as PrismaUser } from '@prisma/client';

export type TPrismaUser = PrismaUser;

export type TUser = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  refresh_token?: string;
};
