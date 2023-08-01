import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/req/create-report.dto';
import { Report } from '../../entity/reports.entity';
import { User } from '@/entity/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(_report: CreateReportDto, user: User) {
    const report = this.repo.create(_report);
    report.user = user;
    return this.repo.save(report);
  }
}
