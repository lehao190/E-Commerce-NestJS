import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/models/product.model';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  password?: string;

  // @Field(type => [Product])
  // products: Product[];
}