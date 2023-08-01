import { Media } from '@/entity/media.entity';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  avatars: any[];
}
