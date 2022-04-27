import { FormControl } from '@angular/forms';

export class AppValidators {
  static validateCard(c: FormControl) {
    let value: string = c.value;
    if (
      value.startsWith('4') ||
      value.startsWith('5') ||
      value.startsWith('6')
    ) {
      return null;
    } else {
      return {
        validateCard: {
          valid: false,
        },
      };
    }
  }
}
