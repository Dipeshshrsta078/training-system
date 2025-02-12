import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenBlacklistDocument = TokenBlacklist & Document;

@Schema({ timestamps: true })
export class TokenBlacklist extends Document {
  @Prop({ required: true, unique: true })
  token: string;
}

export const TokenBlacklistSchema =
  SchemaFactory.createForClass(TokenBlacklist);
