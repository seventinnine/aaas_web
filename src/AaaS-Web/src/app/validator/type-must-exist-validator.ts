import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validDetectorTypes: string[] = [
  "MinMaxDetector",
  "SlidingWindowDetector"
];

export const validActionTypes: string[] = [
  "WebHookAction",
  "MailAction"
];

export const validAggregationOperations: string[] = [
  "Sum",
  "Average",
  "Count"
];

export const validComparisonOperations: string[] = [
  "<=",
  "<",
  "==",
  "!=",
  ">",
  ">=",
];

const comparisonOperationTableWord = new Map<string, string>([
  ["<=", "LessOrEqual"],
  ["<", "Less"],
  ["==", "Equal"],
  ["!=", "NotEqual"],
  [">=", "GreaterOrEqual"],
  [">", "Greater"]
]);

const comparisonOperationTableSign = new Map<string, string>([
  ["LessOrEqual", "<="],
  ["Less", "<"],
  ["Equal", "=="],
  ["NotEqual", "!="],
  ["GreaterOrEqual", ">="],
  ["Greater", ">"]
]);

export function comparisonOperationToWord(value: string) {
  return comparisonOperationTableWord.get(value);
}

export function wordToComparisonOperation(value: string) {
  return comparisonOperationTableSign.get(value);
}

export function typeMustExistValidator(types: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const valid: boolean = types.includes(value);
    return valid ? null : {invalidType: {value: value}};
  };
}