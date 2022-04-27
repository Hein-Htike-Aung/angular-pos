import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instantDate',
})
export class InstantDatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): Date {
    if (value) {
      return new Date(+value * 1000);
    }

    return null;
  }
}
