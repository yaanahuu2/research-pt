// Still in progress...

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, retry, from } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ICollectionsNav } from './../../pages/zotero/ICollectionsNav';

@Injectable({
  providedIn: 'root'
})
export class ZoteroApiService {

  constructor() { }

  getCollections() {
    const url = `${environment.apiUrl}/`;
    return this.http.get<ICollectionsNav[]>(url).pipe(
        tap(_ => console.log('fetched zotero collections')),
        catchError(this.handleError<ICollectionsNav[]>('getCollections', []))
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
