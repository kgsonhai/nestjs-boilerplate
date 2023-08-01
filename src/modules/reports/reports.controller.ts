import { CurrentUser } from '@/modules/user/decorators/current-user.decorator';
import { User } from '@/entity/user.entity';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/req/create-report.dto';
import { ReportsService } from './reports.service';
import { ReportDto } from './dto/res/report.dto';
import { Serialize } from '@/interceptors/serialize.inteceptor';

@Controller('reports')
export class ReportsController {
  constructor(private ReportService: ReportsService) {}

  @Post()
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.ReportService.create(body, user);
  }
}
