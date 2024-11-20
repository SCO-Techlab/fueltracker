import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'enumToArrayNotDividing'
  })
  export class EnumToArrayNotDividing implements PipeTransform {
    transform(data: Object) {
      const keys = Object.keys(data);
      return keys.slice();
    }
  }