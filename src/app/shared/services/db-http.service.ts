import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ZoteroItemNotes } from '../../pages/notes/zotero-item-notes';
import { AlbumItems } from '../../pages/albums/albums';
import { Albums } from '../../pages/albums/albums';
// import { Subtitle } from '../../components/video/subtitles/i-subtitle';
import { CategoryTree } from '../../components/category-tree/category-tree';
import { TimelineItem } from '../../components/timeline/i-timeline-item';

@Injectable({
  providedIn: 'root'
})
export class DbHttpService {

  constructor(private http: HttpClient) { }

  getNotes(key: string): Observable<ZoteroItemNotes[]> {
    const url = `${environment.apiUrl}/notes?key=${key}`;
    return this.http.get<ZoteroItemNotes[]>(url).pipe(
        tap(_ => console.log('fetched zotero items for key=${key}')),
        catchError(this.handleError<ZoteroItemNotes[]>('getNotes key=${key}', []))
      );
  }

  addNote(note: ZoteroItemNotes): Observable<ZoteroItemNotes> {
    return this.http.post<ZoteroItemNotes>(environment.apiUrl + '/notes', note).pipe(
      tap((newNote: ZoteroItemNotes) => console.log(`added note w/ id=${newNote.id}`)),
      catchError(this.handleError<ZoteroItemNotes>('addNote'))
    );
  }

  updateNote(note: ZoteroItemNotes): Observable<any> {
    return this.http.put(environment.apiUrl + '/notes', note).pipe(
      tap(_ => console.log(`updated note id=${note.id}`)),
      catchError(this.handleError<any>("updateNote"))
    );
  }

  getAlbums(): Observable<Albums[]> {
    const url = `${environment.apiUrl}/albums`;
    return this.http.get<Albums[]>(url).pipe(
        tap(_ => console.log('fetched albums')),
        catchError(this.handleError<Albums[]>('getNotes', []))
      );
  }

  getAlbum(id): Observable<Albums> {
    const url = `${environment.apiUrl}/albums?id=${id}`;
    return this.http.get<Albums>(url).pipe(
        tap(_ => console.log('fetched album')),
        catchError(this.handleError<Albums>(`getAlbum id=${id}`))
      );
  }

  getAlbumItems(id: number): Observable<AlbumItems[]> {
    const url = `${environment.apiUrl}/albumItems/?album_id=${id}`;
    return this.http.get<AlbumItems[]>(url).pipe(
      tap(_ => console.log(`fetched album items id=${id}`)),
      catchError(this.handleError<AlbumItems[]>(`getAlbumItems id=${id}`))
    );
  }

  getCategoryTree(tree_id: number): Observable<CategoryTree[]> {
    const url = `${environment.apiUrl}/category_relationships?tree=${tree_id}`;
    return this.http.get<CategoryTree[]>(url).pipe(
        tap(_ => console.log('fetched tree')),
        catchError(this.handleError<CategoryTree[]>(`getCategoryTree tree=${tree_id}`))
      );
  }

  // getSubtitles(): Observable<Subtitle[]> {
  //   const url = `${environment.apiUrl}/subtitles`;
  //   return this.http.get<Subtitle[]>(url).pipe(
  //       tap(_ => console.log('fetched subtitles')),
  //       catchError(this.handleError<Subtitle[]>('getSubtitles', []))
  //     );
  // }
  //
  // addSubtitle(subtitle: Subtitle): Observable<Subtitle> {
  //   return this.http.post<Subtitle>(environment.apiUrl + '/subtitles', subtitle).pipe(
  //     tap((newSubtitle: Subtitle) => console.log(`added subtitle w/ id=${newSubtitle.id}`)),
  //     catchError(this.handleError<Subtitle>('addSubtitle'))
  //   );
  // }
  //
  // updateSubtitle(subtitle: Subtitle): Observable<any> {
  //   return this.http.put(environment.apiUrl + '/subtitles', subtitle).pipe(
  //     tap(_ => console.log(`updated subtitle id=${subtitle.id}`)),
  //     catchError(this.handleError<any>("updateSubtitle"))
  //   );
  // }

  getTimelineItems(): Observable<TimelineItem[]> {
    const url = `${environment.apiUrl}/timeline_items`;
    return this.http.get<TimelineItem[]>(url).pipe(
        tap(_ => console.log('fetched timeline_items')),
        catchError(this.handleError<TimelineItem[]>('getTimelineItems', []))
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
