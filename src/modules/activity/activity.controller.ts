import {
  Body,
  Controller,
  Delete,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AuthGuard } from 'src/guards/user.role.guard';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UserProfile } from 'libs/enum/user-profile.enum';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @UseGuards(AuthGuard)
  @Post()
  async registerActivity(
    @Body() createActivityDto: CreateActivityDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const user = req.user;

      // Ensure only 'expert' users can access this
      if (user.role !== 'expert') {
        throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
      }

      const result = await this.activityService.registerActivity(
        createActivityDto,
        user,
      );
      return res.status(HttpStatus.CREATED).json({
        message: 'Activity create success',
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Data cannot be processed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @Patch(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() updateActivityDto: CreateActivityDto,
    @Req() req,
  ) {
    const user = req.user;

    if (user.role !== UserProfile.EXPERT) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }
    return this.activityService.updateActivity(id, updateActivityDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteActivity(@Param('id') id: string, @Req() req, @Res() res) {
    const user = req.user;
    if (user.role !== UserProfile.EXPERT) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }
    try {
      await this.activityService.deleteActivity(id);
      return res.status(HttpStatus.OK).json({ message: 'Delete success' });
    } catch (error) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Data cannot be processed',
      });
    }
  }
}
