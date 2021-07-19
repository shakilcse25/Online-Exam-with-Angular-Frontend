import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isright'
})
export class IsrightPipe implements PipeTransform {

  transform(value: any, opt: any): unknown {
    let rightAns = JSON.parse(value).answer;
    return opt.indexOf(rightAns) !== -1 ? 1 : 0;
  }

}
