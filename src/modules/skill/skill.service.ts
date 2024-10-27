import { SkillRepository } from 'libs/data-access/repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from 'libs/data-access/schema';

export class SkillService {
  constructor(private skillRepository: SkillRepository) {}

  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
    return await this.skillRepository.create(createSkillDto);
  }

  async getAllSkillsWithActivities() {
    // Find skills that have at least one activity
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
          skill_name: 1,
        },
      },
    ]);

    return skillsWithActivities;
  }
}
