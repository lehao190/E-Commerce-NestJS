import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;
  
  @Field()
  refresh_token: string;

  @Field(type => User)
  user: User;
}

@ObjectType()
export class AuthRefreshResponse {
  @Field()
  access_token: string;
  
  @Field()
  refresh_token: string;
}

@ObjectType()
export class LogoutResponse {
  @Field()
  message: string;
}
