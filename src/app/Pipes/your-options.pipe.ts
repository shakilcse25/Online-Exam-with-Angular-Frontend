import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yourOptions'
})
export class YourOptionsPipe implements PipeTransform {

  transform(right: any, quesId: any, option:any, result:any ): any {
    let rightAns = JSON.parse(right).answer;
    let answersheet = JSON.parse( result.answer_sheet );
    let i = 0;
    answersheet.forEach( (ans) => {
      if( ans.ques_id === quesId && ans.answer == option ) {
        i = (rightAns.indexOf(ans.answer) != -1) ? 1 : 0;;
      }
    });
    return i;
  }

}
