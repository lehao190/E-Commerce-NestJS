import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  providers: [
    PrismaService,
    ProductResolver,
    ProductsService,
    CommentsService
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
