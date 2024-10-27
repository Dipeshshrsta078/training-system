import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/user.role.guard';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SkillService } from './skill.service';

@Controller('v1/skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createSkill(@Body() createSkillDto: CreateSkillDto, @Res() res) {
    try {
      await this.skillService.createSkill(createSkillDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Skill create success',
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Skill could not be created',
      });
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getSkills(@Req() req, @Res() res) {
    try {
      const skills = await this.skillService.getAllSkillsWithActivities();
      return res.status(HttpStatus.OK).json(skills);
    } catch (error) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Data cannot be processed',
      });
    }
  }
}
