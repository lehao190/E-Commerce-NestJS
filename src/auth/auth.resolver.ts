import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";
import { GqlAuthGuard } from "./jwt-auth.guard";
import { CurrentUser } from "./current-user.decorator";
import { UsersService } from "src/users/users.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { LoginInput, RegisterInput } from "./auth.inputs";
import { AuthResponse } from "./auth.model";
import { JwtPayload } from "./auth.types";

@Resolver(of => User)
export class AuthResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  // Get current authenticated user
  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() payload: JwtPayload) {
    return this.usersService.findByEmail(payload.email);
  }

  // User login
  @Mutation(returns => AuthResponse)
  @UseGuards(LocalAuthGuard)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput as User);
  }

  // User signup
  @Mutation(returns => User)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  // User Logout
  @Mutation(returns => User)
  logout() {
    return this.authService.logout();
  }
}