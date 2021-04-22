import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDate',
  pure: false
})
export class SortDatePipe implements PipeTransform {

  transform(items: any[]) {
    var sortedItems = [];
    sortedItems = this.sortDate(items);

    return sortedItems;
  }

  sortDate(arr) {
    arr.sort(function(a, b) {
      var dateA = new Date(a.datetime);
      var dateB = new Date(b.datetime);

      return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
    });

    return arr;
  }

}
