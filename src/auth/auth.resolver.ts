import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";
import { GqlAuthGuard } from "./jwt-auth.guard";
import { CurrentUser } from "./current-user.decorator";
import { UsersService } from "src/users/users.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { LoginInput } from "./auth.inputs";
import { AuthResponse } from "./auth.model";

@Resolver(of => User)
export class AuthResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return this.usersService.findOne(user.username);
  }

  @Mutation(returns => AuthResponse)
  @UseGuards(LocalAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput as User);
  }

  @Mutation(returns => User)
  @UseGuards(LocalAuthGuard)
  register() {
    // return this.authService.login();
  }

  @Mutation(returns => User)
  logout() {
    // return this.authService.login();
  }
}