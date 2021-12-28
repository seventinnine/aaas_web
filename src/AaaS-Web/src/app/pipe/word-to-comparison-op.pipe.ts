import { Pipe, PipeTransform } from '@angular/core';
import { wordToComparisonOperation } from '../validator/type-must-exist-validator';

@Pipe({
  name: 'wordToComparisonOp'
})
export class WordToComparisonOpPipe implements PipeTransform {

  transform(value?: string): string {
    return wordToComparisonOperation(value ?? "") ?? "";
  }

}
