import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type ActivityDocument = Activity & Document;

@Schema({ timestamps: true })
export class Activity {
  @Prop({ required: true })
  skill: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startdate: Date;

  @Prop({ required: true })
  enddate: Date;

  @Prop({ type: [{ type: Object, ref: 'User' }], required: true })
  participants: User[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
