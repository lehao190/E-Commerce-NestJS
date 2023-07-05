import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/models/product.model';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  userName?: string;

  @Field(type => [Product])
  products: Product[];
}