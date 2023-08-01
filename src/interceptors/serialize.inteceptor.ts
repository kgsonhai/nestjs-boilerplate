import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassDto {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassDto) {
  return UseInterceptors(new SerializeInteceptor(dto));
}

export class SerializeInteceptor implements NestInterceptor {
  constructor(private dto: ClassDto) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data: any) =>
          plainToClass(this.dto, data, { excludeExtraneousValues: true }),
        ),
      );
  }
}
