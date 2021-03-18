import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Lookbook } from '../types/types';

const lookbook1: Lookbook = {
  'id': "1",
  'name': "horses",
  'author': "Jimmy Lulua"
}

const lookbook2: Lookbook = {
  'id': "2",
  'name': "footwear",
  'author': "Tynker Hatfield"
}

const lookbook3: Lookbook = {
  'id': "3",
  'name': "hats",
  'author': "Blake Sellars"
}


@Injectable({
  providedIn: 'root'
})
export class LookbookService {
  private lookbooks: Lookbook[] = [lookbook1,lookbook2,lookbook3];

  constructor() { }

  getLookbooks(): Observable<Lookbook[]>{
    return of(this.lookbooks);
  }

  getLookbookByID(id: string): Observable<Lookbook>{
    return of(this.lookbooks.filter((book: Lookbook)=>{
      return book.id === id;
    })[0]);
  }

  mockPageLoad(loadingTime: number): Observable<boolean>{
    return(of(true).pipe(delay(loadingTime)));
  }
}
