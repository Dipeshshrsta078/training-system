import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ActivityRepository,
  SkillRepository,
  UsersRepository,
} from 'libs/data-access/repository';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    private activityRepository: ActivityRepository,
    private skillRepository: SkillRepository,
    private usersRepository: UsersRepository,
  ) {}

  async registerActivity(
    createActivityDto: CreateActivityDto,
    user,
  ): Promise<{ message: string }> {
    const { skill, participants } = createActivityDto;
    const skillExists = await this.skillRepository.findById(skill);

    if (!skillExists) {
      throw new NotFoundException('Skill not found');
    }
    const participantUsers = await this.usersRepository.find({
      _id: { $in: participants },
    });

    // Check if all participant IDs exist
    if (participantUsers.length !== participants.length) {
      throw new HttpException(
        'One or more participants do not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      this.activityRepository.create({
        ...createActivityDto,
      });
      return { message: 'create success' };
    } catch (error) {
      throw new UnprocessableEntityException('Data cannot be processed');
    }
  }

  async updateActivity(
    id: string,
    updateActivityDto: CreateActivityDto,
  ): Promise<any> {
    if (updateActivityDto?.participants.length > 0) {
      const participantUsers = await this.usersRepository.find({
        _id: { $in: updateActivityDto.participants },
      });

      if (participantUsers.length !== updateActivityDto.participants.length) {
        throw new HttpException(
          'One or more participants do not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    try {
      await this.activityRepository.updateOne({ _id: id }, updateActivityDto);
      return { message: 'update success' };
    } catch (error) {
      throw new HttpException(
        'Data cannot be processed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteActivity(id: string): Promise<void> {
    const result = await this.activityRepository.deleteById(id);
    if (!result) {
      throw new NotFoundException('Activity not found');
    }
  }
}
