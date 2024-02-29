import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/common/graphql-models/pagination.model';

@ObjectType()
export class Comment {
  @Field(type => Int)
  id: number;

  @Field()
  text: string;


  @Field(type => Int)
  rating: number;
}

@ObjectType()
export class PaginatedComment extends PaginateResult(Comment) {}
