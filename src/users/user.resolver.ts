import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { Product } from "src/products/models/product.model";
import { ProductInput } from "./user.inputs";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {
  constructor(
		private usersService: UsersService
	) {}

  @Query(returns => User, { name: 'user', nullable: true })
  async getUser(@Args('id', { type: () => Int }) id: number) {
		return this.usersService.findOne(id);
  }

  // @Mutation(returns => Product)
	// 	async increaseReviews(@Args('productInput') productInput: ProductInput) {

	// 		return {
	// 			id: 4,
	// 			title: 'Elon Musk Mutation'
	// 		}
	// }


  // @ResolveField('products', returns => [Product])
  // async products(@Parent() user: User) {
  //   const { id } = user;
    
  //   return [
	// 		{
	// 			id: 1,
	// 			title: 'Electric Product'
	// 		},
	// 		{
	// 			id: 2,
	// 			title: 'Elon Musk'
	// 		}
  //   ]
  // }
}