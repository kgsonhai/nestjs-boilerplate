import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {
  @IsString()
  name: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Max(2024)
  @Min(1560)
  year: number;
}
