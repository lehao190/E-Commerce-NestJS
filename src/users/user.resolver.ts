import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { Product } from "src/products/models/product.model";
import { ProductInput } from "./user.inputs";

@Resolver(of => User)
export class UsersResolver {
  constructor(
    // private usersService: UsersService,
    // private productsService: ProductsService,
  ) {}

  @Query(returns => User)
  me() {
    return {
			id: 2,
			userName: 'Take on me'
    }
  }

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    // return this.usersService.findOneById(id);
    // console.log('User ID: ', id)
    return {
			id: 1,
			userName: 'Test',
    }
  }

  @Mutation(returns => Product)
		async increaseReviews(@Args('productInput') productInput: ProductInput) {

			return {
				id: 4,
				title: 'Elon Musk Mutation'
			}
		// return this.productsService.upvoteById({ id: postId });
	}


  @ResolveField('products', returns => [Product])
  async products(@Parent() user: User) {
    const { id } = user;
    // console.log('Product ID: ', id)
    // return this.productsService.findAll({ userId: id });
    return [
			{
				id: 1,
				title: 'Electric Product'
			},
			{
				id: 2,
				title: 'Elon Musk'
			}
    ]
  }
}