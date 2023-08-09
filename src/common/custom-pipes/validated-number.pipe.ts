import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

// A custom pipe to ensure the positive number is being passed and that it is not bigInt

@Injectable()
export class ValidatedNumberPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = Number(value);
    const maxInt = 2147483647;
    if (isNaN(val) || val > maxInt || val < 0) {
      throw new BadRequestException('Validation has failed');
    }
    return val;
  }
}
