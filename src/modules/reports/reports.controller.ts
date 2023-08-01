import { User } from '@/entity/user.entity';
import { Serialize } from '@/interceptors/serialize.inteceptor';
import { CurrentUser } from '@/modules/user/decorators/current-user.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dto/req/create-report.dto';
import { ReportDto } from './dto/res/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private ReportService: ReportsService) {}

  @Post()
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.ReportService.create(body, user);
  }
}
