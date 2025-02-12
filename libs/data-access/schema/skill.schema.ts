import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true, unique: true })
  skillName: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
