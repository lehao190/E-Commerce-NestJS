import { Args, Mutation, Query, Resolver, Context, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PaginatedProduct, Product } from './models/product.model';
import { ProductsService } from './products.service';
import { TPrismaProduct } from './types/product.types';
import {
  CreateProductInput,
  UpdateProductInput,
} from './inputs/products.inputs';
import { Comment } from 'src/comments/models/comment.model';
import { PaginationInput } from 'src/common/graphql-inputs/pagination.inputs';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { CommentsService } from 'src/comments/comments.service';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(
    private productsService: ProductsService,
    private commentsService: CommentsService
  ) {}

  @ResolveField('comments', returns => [Comment])
  async comments(@Parent() product: Product) {
    const comments = await this.commentsService.getAllByPage(product.id, { page: 1, perPage: 5 });
    return comments.data;
  }

  @Query((returns) => PaginatedProduct)
  getProductsByPage(
    @Args('paginationInput') paginationInput: PaginationInput,
  ): Promise<PaginatorTypes.PaginatedResult<TPrismaProduct>> {
    return this.productsService.getAllByPage(paginationInput);
  }

  @Query((returns) => Product)
  getProductDetails(
    @Args('id', { type: () => Int }) productId: number,
  ): Promise<TPrismaProduct> {
    return this.productsService.findOne(productId);
  }

  @Mutation((returns) => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<TPrismaProduct> {
    return this.productsService.create(createProductInput);
  }

  @Mutation((returns) => Product)
  updateProduct(
    @Args('id', { type: () => Int }) productId: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<TPrismaProduct> {
    return this.productsService.update(productId, updateProductInput);
  }

  @Mutation((returns) => Product)
  deleteProduct(
    @Args('id', { type: () => Int }) productId: number,
  ): Promise<TPrismaProduct> {
    return this.productsService.delete(productId);
  }
}
