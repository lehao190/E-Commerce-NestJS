import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    UsersService,
    UsersResolver,
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
