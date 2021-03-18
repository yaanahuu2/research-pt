import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookbookSelectionsService {

  lookbook_selections = any;

  constructor() { }

  getLookbookSelections(): Observable<any> {
    return this.lookbook_selections;
  }

  addAlbumItem(id) {
    this.lookbook_selections.push(id);
  }
}
