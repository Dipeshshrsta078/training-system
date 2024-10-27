import { UsersRepository } from 'libs/data-access/repository';
import { AuthService } from './auth.service';

export const providers = [AuthService, UsersRepository];
