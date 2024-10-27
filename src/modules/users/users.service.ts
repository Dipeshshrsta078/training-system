import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SkillRepository, UsersRepository } from 'libs/data-access/repository';
import { RegisterDto } from './dto/register.dto';
import { UserProfile } from 'libs/enum/user-profile.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private skillRepository: SkillRepository,
  ) {}

  async register(
    createUserDto: RegisterDto,
    userRole: string,
  ): Promise<{ statusCode: number; message: string }> {
    if (userRole !== UserProfile.BOARD) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const existingUser = await this.userRepository.findOne({
      $or: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    if (existingUser) {
      throw new BadRequestException('Username/Email already exists.');
    }

    if (createUserDto?.skill && createUserDto?.skill.length > 0) {
      const skillExists = await this.skillRepository.find({
        _id: { $in: createUserDto?.skill },
      });

      if (createUserDto?.skill?.length) {
        throw new HttpException(
          'One or more participants do not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    const hash = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    const user = { ...createUserDto, password: hash };
    await this.userRepository.create(user);
    return {
      statusCode: 200,
      message: 'User created successfully.',
    };
  }
}
