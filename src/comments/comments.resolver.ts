import { Args, Mutation, Query, Resolver, Context, Int } from '@nestjs/graphql';
import { Comment, PaginatedComment } from './models/comment.model';
import { CreateCommentInput } from './inputs/comment.inputs';
import { TPrismaComment } from './types/comment.types';
import { CommentsService } from './comments.service';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { PaginationInput } from '../common/graphql-inputs/pagination.inputs';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(private commentsService: CommentsService) {}

  @Query((returns) => PaginatedComment)
  getCommentsByPage(
    @Args('id', { type: () => Int }) productId: number,
    @Args('paginationInput') paginationInput: PaginationInput,
  ): Promise<PaginatorTypes.PaginatedResult<TPrismaComment>> {
    return this.commentsService.getAllByPage(productId, paginationInput);
  }

  @Mutation((returns) => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<TPrismaComment> {
    return this.commentsService.create(createCommentInput);
  }
}
