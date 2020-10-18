import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderType'
})
export class OrderTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let phrase;
    switch (value) {
      case "INQUIRY" :
        phrase = "Inquiry";
        break;
      
      case "RETURN_EXCHANGE" :
        phrase = "Return";
        break;
      
      case "ORDER" :
        phrase = "Order";
        break;
    }
    return phrase;
  }

}
