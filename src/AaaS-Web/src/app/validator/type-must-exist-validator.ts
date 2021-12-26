import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validDetectorTypes: string[] = [
  "MinMaxDetector",
  "SlidingWindowDetector"
];

export function typeMustExistValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const valid: boolean = validDetectorTypes.includes(value);
      return valid ? null : {invalidType: {value: value}};
    };
  }