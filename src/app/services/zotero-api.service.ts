

// NOT CURRENTLY IN USE - FOR FUTURE IMPLEMENTATION

import { Injectable } from '@angular/core';
import api from 'zotero-api-client';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { CollectionsNav } from './../pages/zotero/collectionsnav';

@Injectable({
  providedIn: 'root'
})
export class ZoteroApiService {

  response: any;
  auth_key = environment.auth_key;
  user = environment.user;
  group = environment.group;
  collections: any;
  collections_nav: CollectionsNav[];
  zoteroItems: string;

  constructor() { }

  getCollections(): Observable<any[]> {
    return api(this.auth_key).library('group', this.group).collections().get();
  }



  // getCollectionItems(collectionKey) {
  //   this.response = api(this.auth_key).library('group', this.group).collections(collectionKey).items().get();
  //   console.log(this.response);
  //   this.response.then(data => {
  //     this.zoteroItems = data.raw;
  //     console.log(this.zoteroItems);
  //     // this.zoteroItems.sort(function(a, b) {
  //     //     var textA = a.data.name.toUpperCase();
  //     //     var textB = b.data.name.toUpperCase();
  //     //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  //     // });
  //   });
  // }
  //
  // sortCollections(arr) {
  //   arr.sort(function(a, b) {
  //       var textA = a.data.parentCollection;
  //       var textB = b.data.parentCollection;
  //       return (textA == false) ? -1 : 0;
  //   });
  //
  //   return arr;
  // }
  //
  // getNestedChildren(arr, parent) {
  //   var out = [];
  //
  //   for(var i in arr) {
  //     if(arr[i].data.parentCollection == parent) {
  //       var outVar: CollectionsNav = {
  //         key: arr[i].data.key,
  //         name: arr[i].data.name
  //       }
  //
  //       var children = this.getNestedChildren(arr, arr[i].data.key);
  //
  //       if (children.length) {
  //           outVar.children = children;
  //       }
  //
  //       out.push(outVar);
  //
  //     }
  //   }
  //
  //   return out;
  // }
  //
  // checkType(type) {
  //   switch (type) {
  //     case 'attachment':
  //       return false;
  //       break;
  //     case 'note':
  //       return false;
  //       break;
  //     default:
  //       return true;
  //       break;
  //   }
  // }


}
