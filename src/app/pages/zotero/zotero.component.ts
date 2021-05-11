import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import api from 'zotero-api-client';
import { environment } from '../../../environments/environment';
import { CollectionsNav } from './collectionsnav';
import { MatDialog } from '@angular/material/dialog';
import { ZoteroDialogContComponent } from './zotero-dialog-cont/zotero-dialog-cont.component';

@Component({
  selector: 'app-zotero',
  templateUrl: './zotero.component.html',
  styleUrls: ['./zotero.component.css']
})
export class ZoteroComponent implements OnInit {

  response: any;
  auth_key = environment.auth_key;
  group = environment.group;
  resourceTypeKey: string = '5VYN8W7C';
  resourceTypesNav: CollectionsNav[];
  filmCategoriesNav: CollectionsNav[];
  navType: string = '';
  collectionName: string;
  zoteroItems: any;
  hideLoadingCollections = true;
  hideLoadingItems = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections() {
    this.hideLoadingCollections = false;
    var collections = [];

    this.response = api(this.auth_key).library('group', this.group).collections().get({ limit: 1000 });
    this.response.then(data => {
      collections = data.raw;
      collections = this.sortCollectionsKeys(collections);
      this.resourceTypesNav = this.createCollectionNav(collections, 'types');
      // this.resourceTypesNav.forEach(item => console.log('1 ' + item.data.name));

      this.filmCategoriesNav = this.createCollectionNav(collections, 'film');
      // this.filmCategoriesNav.forEach(item => console.log('2 ' + item.data.name));

      this.resourceTypesNav = this.getNestedChildren(this.resourceTypesNav, false);
      this.filmCategoriesNav = this.getNestedChildren(this.filmCategoriesNav, false);

      this.resourceTypesNav = this.sortCollectionsNames(this.resourceTypesNav);
      this.filmCategoriesNav = this.sortCollectionsNames(this.filmCategoriesNav);
      this.hideLoadingCollections = true;
    });

  }

  getCollectionItems(collectionKey) {
    var arr = [];
    this.navType = 'types';
    this.hideLoadingItems = false;
    this.zoteroItems = [];

    this.response = api(this.auth_key).library('group', this.group).collections(collectionKey).items().get({ limit: 1000 });
    this.response.then(data => {
      arr = data.raw;

      arr.sort(function(a, b) {
        if (typeof a.data.title != 'undefined' && typeof b.data.title != 'undefined') {
          var textA = a.data.title.toUpperCase();
          var textB = b.data.title.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }
        else {
          return 0;
        }
      });

      this.zoteroItems = arr;
      this.collateItemChildren();
      console.log(this.zoteroItems);

      this.hideLoadingItems = true;
    });
  }

  getCollectionItemsByTag(collectionsName) {
    var arr = [];
    this.navType = 'film';
    this.hideLoadingItems = false;
    this.zoteroItems = [];
    var tagQuery = this.convertCategoryNameToTag(collectionsName);

    this.response = api(this.auth_key).library('group', this.group).items().get({ limit: 1000, tag: tagQuery });
    this.response.then(data => {
      arr = data.raw;
      // console.log(arr);

      arr.forEach((item, index) => {
        if (item.data.itemType == 'note') {
          item.data.title = 'Note: ' + item.data.note.replace(/(<([^>]+)>)/gi, "").substring(0, 30) + ' ...';
        }
      });

      arr.sort(function(a, b) {
        if (typeof a.data.title != 'undefined' && typeof b.data.title != 'undefined') {
          var textA = a.data.title.toUpperCase();
          var textB = b.data.title.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }
        else {
          return 0;
        }
      });

      this.zoteroItems = arr;
      this.collateItemChildren();
      // console.log(this.zoteroItems);

      this.hideLoadingItems = true;
    });
  }

  zoteroQueryTest(key: string): Observable<any> {
    const ZoteroObservable = from(api(this.auth_key).template('book').get());
    return ZoteroObservable;
    // this.response = api(this.auth_key).template('book').get();
    // this.response.then(data => {
    //   console.log(data.raw);
    // });

  }

  zoteroObsTest(): void {
    this.zoteroQueryTest('H74XIF5D')
    .subscribe(item => console.log(item));
  }

  sortCollectionsKeys(arr) {
    arr.sort(function(a, b) {
        var textA = a.data.parentCollection;
        var textB = b.data.parentCollection;
        return (textA == false) ? -1 : 0;
    });

    return arr;
  }

  sortCollectionsNames(arr) {
    arr.sort(function(a, b) {
        var textA = a.name.toLowerCase();
        var textB = b.name.toLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    return arr;
  }

  getNestedChildren(arr, parent) {  // type array, string
    var out = [];

    for(var i in arr) {
      // console.log(arr[i].data.parentCollection + ' : ' + arr[i].data.name);
      if(arr[i].data.parentCollection == parent) {
        var outVar: CollectionsNav = {
          key: arr[i].data.key,
          name: arr[i].data.name,
          data: arr[i].data
        }

        var children = this.getNestedChildren(arr, arr[i].data.key);

        if (children?.length) {
          children.sort(function(a, b) {
              var textA = a.name;
              var textB = b.name;
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });

          outVar.children = children;
        }

        out.push(outVar);

      }
    }

    return out;
  }

  collateItemChildren() {
    this.zoteroItems.forEach(item => {
      if (typeof item.data.parentItem == 'undefined' && item.data.itemType !== 'note') {
        item.childItems = [];
        this.response = api(this.auth_key).library('group', this.group).items(item.key).children().get({ limit: 1000 });
        this.response.then(data => {
          var arr = data.raw;
          arr.forEach(child => {
            item.childItems.push(child);
          });
        });
      }
    });
  }

  createCollectionNav(arr, navType) {
    // const toDelete = new Set([this.resourceTypeKey]);
    if (navType == 'types') {
      var newArray = arr.filter(item => {
        if (item.data.parentCollection === false && item.data.key == this.resourceTypeKey) {
          return item;
        }
        else if (item.data.parentCollection !== false) {
          return item;
        }
      });
    }
    else if (navType == 'film') {
      var newArray = arr.filter(item => {
        if (item.data.parentCollection === false && item.data.key !== this.resourceTypeKey) {
          return item;
        }
        else if (item.data.parentCollection !== false) {
          return item;
        }
      });
    }

    return newArray;
  }

  convertCategoryNameToTag(str) {
    str = str.split(' ');
    var newStr: string = '';
    str.forEach(i => {
      newStr += i.charAt(0).toUpperCase() + i.slice(1);
    });

    return newStr;
  }

  checkType(type) {
    if (type == 'attachment') {
      return false;
    }
    else if (type == 'note' && this.navType == 'types') {
      return false;
    }
    else {
      return true;
    }
  }

  openItemDialog(item) {
    console.log(JSON.stringify(item.data.relations));

    var selectedItem = item;
    let dialogRef = this.dialog.open(ZoteroDialogContComponent, {
      data: selectedItem
    });

  }

}
