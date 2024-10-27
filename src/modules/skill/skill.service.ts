import { SkillRepository } from 'libs/data-access/repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from 'libs/data-access/schema';

export class SkillService {
  constructor(private skillRepository: SkillRepository) {}

  async createSkill(createSkillDto: CreateSkillDto): Promise<any> {
    const skill = await this.skillRepository.create({ createSkillDto });
    return;
  }

  async getAllSkillsWithActivities() {
    const skillsWithActivities = await this.skillRepository.aggregate([
      {
        $lookup: {
          from: 'activities',
          localField: '_id',
          foreignField: 'skill',
          as: 'activities',
        },
      },
      {
        $match: { activities: { $ne: [] } },
      },
      {
        $project: {
          _id: 1,
          skillName: 1,
        },
      },
    ]);

    return skillsWithActivities;
  }
}
