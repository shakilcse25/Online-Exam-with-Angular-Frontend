import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'question'
})
export class QuestionPipe implements PipeTransform {

  transform( questions: any[], questionId: any, next: boolean ): any {

    if( ! questions?.length ) {
      return questions;
    }

    let i = 0;
    let j = 0;
    for( const ques of questions ) {
      j++;

      if( next &&  i ){
        return ques.id;
      }

      if( ques.id === questionId ) {
        if( ! next ) {
          return ques;
        }

        if( next ){
          i = 1;
          if( questions?.length === j ){
            return -1;
          }
          continue;
        }
      }

    }

    return questions;
  }

}
