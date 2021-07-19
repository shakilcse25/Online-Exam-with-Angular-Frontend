import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'options'
})
export class OptionsPipe implements PipeTransform {

  transform(value: any): unknown {
    return JSON.parse( value ).options;
  }

}
