import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreaker'
})
export class LineBreakerPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (Array.isArray(value)) {
      value = value.join(',');
    }
    if (typeof value !== 'boolean' && value.includes(args[0])) {
      value = value.replace(args[0], '<br/>');
    }
    return value;
  }

}
