import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'navigator'
})
export class NavigatorPipe implements PipeTransform {

  transform(value: any, id: any): any {
    let phrase;
    switch (value) {
      case "INQUIRY" :
        phrase = ["../../inquiry", id];
        break;
      
      case "RETURN_EXCHANGE" :
        phrase = ["../../returns",id];
        break;
      
      case "ORDER" :
        phrase = ["../../orders",id];
        break;
      
    }
    return phrase;
  }

}
