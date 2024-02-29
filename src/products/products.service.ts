import { Injectable } from '@nestjs/common';
import { ICrudBase } from 'src/common/interfaces/crud-base.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TPrismaProduct } from './types/product.types';
import { CreateProductInput } from './inputs/products.inputs';
import { PaginationInput } from 'src/common/graphql-inputs/pagination.inputs';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { paginate } from 'src/common/utils/paginate';

@Injectable()
export class ProductsService implements ICrudBase<TPrismaProduct>{
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductInput): Promise<TPrismaProduct> {
    return this.prisma.product.create({
      data
    });
  }

  getAllByPage(
    paginationInput?: PaginationInput
  ): Promise<PaginatorTypes.PaginatedResult<TPrismaProduct>> {
    return paginate(
      this.prisma.product,
      {
        orderBy: {
          createdAt: 'desc'
        },
      },
      {
        page: paginationInput.page,
        perPage: paginationInput.perPage,
      },
    );
  }

  async getAll() {
    return this.prisma.product.findMany();
  }

  async findOne(
    id: number
  ): Promise<TPrismaProduct | null> {
    return this.prisma.product.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, data: Partial<TPrismaProduct>): Promise<TPrismaProduct | null> {
    return this.prisma.product.update({
      where: {
        id,
      },
      data
    });
  }

  async delete(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      }
    });
  }
}
