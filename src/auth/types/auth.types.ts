export type JwtPayload = {
  userId: string | number;
  email: string;
}

export type TAuth = {
  access_token: string;
}