import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'searchPost'
})
export class SearchPostPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(items: any[], field: any ,  value: any): any {
    if(!value) return items;
    return items.filter(
      it => it[field].search(value) != -1);

    
  }

}
