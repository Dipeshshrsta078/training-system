export interface JwtPayload {
  sub: string;
  username: string;
  profile: string;
  iat?: number;
  exp?: number;
}
