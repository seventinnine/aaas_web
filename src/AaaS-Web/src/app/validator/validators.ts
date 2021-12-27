import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { toExecutionInterval } from "../util/utils";

// takes a predicate

export function CheckIfMinValueNotLargerThanMaxValue (c: AbstractControl) {
  //safety check
  if (c.get('minValue')?.value <= c.get('maxValue')?.value) { return null }
  c.get('minValue')?.setErrors({minMaxValid: true});
  return {minMaxValid: {value: false}}
}

export function TotalDurationMoreThanOneSecond (c: AbstractControl) {
  //safety check
  if (toExecutionInterval(
    c.get('executionInterval1')!.value,
    c.get('executionInterval2')!.value,
    c.get('executionInterval3')!.value
  ) >= 1000) return null;
  c.get('executionInterval1')!.setErrors({totalDurationInvalid: true});
  return {totalDurationInvalid: {value: false}}
}

export function CheckIfDetectorDoesNotAlreadyExist (c: AbstractControl) {
  return null;
}