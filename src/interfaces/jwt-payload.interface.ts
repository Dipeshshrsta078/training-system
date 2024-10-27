export interface JwtPayload {
  sub: string; // The subject, typically userId
  username: string; // The user's username
  profile: string; // The user's profile (board, expert, trainer, competitor)
  iat?: number; // Issued at (optional)
  exp?: number; // Expiration time (optional)
}
