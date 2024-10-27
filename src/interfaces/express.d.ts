import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Change 'any' to the appropriate type for your user object
    }
  }
}
