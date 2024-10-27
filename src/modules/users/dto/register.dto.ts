import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { UserProfile } from 'libs/enum/user-profile.enum';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(
    /^(?!.*[<>])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,.]).{8,}$/,
    {
      message:
        'Password must be at least eight character long, one uppercase letter, one lower case letter , one number and one special character excluding < and >.',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEnum(UserProfile)
  @IsNotEmpty()
  profile: UserProfile;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skill?: string;
}
