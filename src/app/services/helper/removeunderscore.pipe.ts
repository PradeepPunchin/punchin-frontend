import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeunderscore'
})
export class RemoveunderscorePipe implements PipeTransform {
  transform(value: any): string {
    return value?.replace(/[^a-zA-Z ]/g, " ");
  }

}

