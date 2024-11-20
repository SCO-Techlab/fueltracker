import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'existsElement'
})
export class ExistsElementPipe implements PipeTransform {

  transform(value: any[], element: any): any {
    return value.find(e => e == element);
  }

}
