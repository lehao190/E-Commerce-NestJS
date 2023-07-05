import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field({nullable: true})
  description?: string;

  @Field(type => Int, { nullable: true })
  reviews?: number;
}