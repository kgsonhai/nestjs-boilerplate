import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  name: string;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
