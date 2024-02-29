import { Injectable } from '@nestjs/common';
import { ICrudBase } from 'src/common/interfaces/crud-base.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TPrismaComment } from './types/comment.types';
import { CreateCommentInput } from './inputs/comment.inputs';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { paginate } from 'src/common/utils/paginate';
import { PaginationInput } from 'src/common/graphql-inputs/pagination.inputs';

@Injectable()
export class CommentsService implements ICrudBase<TPrismaComment> {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCommentInput): Promise<TPrismaComment> {
    return this.prisma.comment.create({
      data,
    });
  }

  getAllByPage(
    productId: number,
    paginationInput: PaginationInput
  ): Promise<PaginatorTypes.PaginatedResult<TPrismaComment>> {
    return paginate(
      this.prisma.comment,
      {
        where: {
          productId,
        },
      },
      {
        page: paginationInput.page,
        perPage: paginationInput.perPage,
      },
    );
  }

  async getAll(productId: number) {
    return this.prisma.comment.findMany({
      where: {
        productId,
      },
    });
  }

  async findOne(id: number): Promise<TPrismaComment | null> {
    return this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    data: Partial<TPrismaComment>,
  ): Promise<TPrismaComment | null> {
    return this.prisma.comment.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
