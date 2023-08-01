import { Expose } from 'class-transformer';

export class LoginResDto {
  @Expose()
  roles: string[];

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
