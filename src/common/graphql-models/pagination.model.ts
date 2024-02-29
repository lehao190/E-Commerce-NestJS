import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
class Meta {
  @Field(type => Int)
  total: number;

  @Field(type => Int)
  lastPage: number;

  @Field(type => Int)
  currentPage: number;

  @Field(type => Int)
  perPage: number;
  
  @Field(type => Int, { nullable: true })
  prev: number;

  @Field(type => Int, { nullable: true })
  next: number;
}

export function PaginateResult<T>(ItemType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class Pagination {
    @Field(() => [ItemType])
    data: T[];

    @Field(type => Meta)
    meta: Meta;
  }

  return Pagination;
}