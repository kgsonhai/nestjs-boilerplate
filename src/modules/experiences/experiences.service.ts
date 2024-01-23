import { Get, Injectable } from '@nestjs/common';
import { experiences } from './mock/mock.data';

@Injectable()
export class ExperiencesService {
  fetchAllExperiences() {
    return experiences;
  }
}
