import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/models/comment.model';
import { PaginateResult } from 'src/common/graphql-models/pagination.model';

@ObjectType()
export class Product {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(type => Int)
  price: number;

  @Field(type => Int)
  quantity: number;
  
  @Field()
  category: string;

  @Field()
  image: string;

  @Field(type => Int, { nullable: true })
  ratings?: number;

  @Field(type => [Comment])
  comments: Comment[];
}

@ObjectType()
export class PaginatedProduct extends PaginateResult(Product) {}
