import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  transform(value: string, flag?: string): any {
      var newval;

      if (flag == 'outer') {
         newval = value.replace(/<p>(.*?)<\/p>$/g, '$1'); // replace enclosing tags
      }
      else {
         newval = value.replace(/<.*?>/g, ''); // replace all tags
      }

      return newval;
  }

}
