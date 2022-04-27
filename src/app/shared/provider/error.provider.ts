import { AbstractControl, FormGroup, FormArray } from '@angular/forms';
export class ErrorProvider {
  public static showError(controlName: string, form: FormGroup) {
    const control = form.get(controlName);

    return control.invalid && control.touched;
  }

  public static showErrorForFormArray(
    controlName: string,
    form: FormGroup,
    formArrayName: string,
    index: number
  ) {
    const fArray = form.get(formArrayName) as FormArray;
    const control = fArray.at(index).get(controlName);

    return control.invalid && control.touched;
  }
}
