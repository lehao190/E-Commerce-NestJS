import { TUser } from 'src/users/types/user.types';

export type JwtPayload = {
  userId: number;
  username: string;
  email: string;
};

export type TAuth = {
  access_token: string;
  refresh_token: string;
  user: TUser;
};

export type TAuthWithoutUser = Omit<TAuth, 'user'>;
