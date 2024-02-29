import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [
    PrismaService,
    CommentResolver,
    CommentsService
  ],
  exports: [
    CommentsService
  ]
})
export class CommentsModule {}
