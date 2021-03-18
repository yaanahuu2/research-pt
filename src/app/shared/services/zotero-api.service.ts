// Still in progress...

import { Injectable } from '@angular/core';
import api from 'zotero-api-client';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { CollectionsNav } from './../../pages/zotero/collectionsnav';

@Injectable({
  providedIn: 'root'
})
export class ZoteroApiService {

  response: any;
  auth_key = environment.auth_key;
  group = environment.group;
  collectionsNav: CollectionsNav[];
  zoteroItems: string;

  constructor() { }

  getCollections() {
    let promise = new Promise((resolve, reject) => {
      api(this.auth_key).library('group', this.group).collections().get()
        .toPromise()
        .then(
          data => {
            console.log('fetched Zotero Collections');
            resolve();
          });
    });

    return promise;
  }

  getCollectionItems(collectionKey): Observable<any> {
    return api(this.auth_key).library('group', this.group).collections(collectionKey).get<any>().pipe(
      tap(_ => console.log('fetched Zotero Collection Items')),
      catchError(this.handleError<any>('getCollectionItems()', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
