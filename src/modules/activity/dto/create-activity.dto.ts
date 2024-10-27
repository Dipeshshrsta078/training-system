import { IsString, IsDate, IsArray, IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  skill: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsArray()
  @IsNotEmpty()
  participants: string[];
}
