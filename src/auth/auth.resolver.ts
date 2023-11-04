import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Context } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";
import { GqlAuthGuard } from "./guards/jwt-auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";
import { UsersService } from "src/users/users.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { LoginInput, RegisterInput } from "./inputs/auth.inputs";
import { AuthResponse } from "./models/auth.model";
import { TAuth, JwtPayload } from "./types/auth.types";
import { TUser } from "src/users/types/user.types";

@Resolver(of => User)
export class AuthResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  // Get current authenticated user
  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() payload: JwtPayload): Promise<TUser> {
    return this.usersService.findByEmail(payload.email);
  }

  // User login
  @Mutation(returns => AuthResponse)
  @UseGuards(LocalAuthGuard)
  login(@Context() context, @Args('loginInput') loginInput: LoginInput): Promise<TAuth> {
    console.log('context: ', context.user);
    return this.authService.login(loginInput);
  }

  // User signup
  @Mutation(returns => User)
  register(@Args('registerInput') registerInput: RegisterInput): Promise<TUser> {
    return this.authService.register(registerInput);
  }

  // User Logout
  @Mutation(returns => User)
  logout() {
    return this.authService.logout();
  }
}