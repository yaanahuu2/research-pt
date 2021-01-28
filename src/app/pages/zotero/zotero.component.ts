import { Component, OnInit } from '@angular/core';
import api from 'zotero-api-client';
import { environment } from '../../../environments/environment';
import { CollectionsNav } from './collectionsnav';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { ZoteroDialogContComponent } from './zotero-dialog-cont/zotero-dialog-cont.component';

@Component({
  selector: 'app-zotero',
  templateUrl: './zotero.component.html',
  styleUrls: ['./zotero.component.css']
})
export class ZoteroComponent implements OnInit {

  response: any;
  datacollections: any;
  auth_key = environment.auth_key;
  group = environment.group;
  collections: any;
  collections_nav: CollectionsNav[];
  zoteroItems: any;
  hideLoading = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.collections = this.getCollections();
  }

  getCollections() {
    var collections = [];

    this.response = api(this.auth_key).library('group', this.group).collections().get();
    this.response.then(data => {
      collections = data.raw;
      this.collections_nav = this.createNavArray(collections);
      this.collections_nav = this.getNestedChildren(this.collections_nav, false);
    });
  }

  getCollectionItems(collectionKey) {
    var arr = [];
    this.hideLoading = false;
    this.zoteroItems = [];

    this.response = api(this.auth_key).library('group', this.group).collections(collectionKey).items().get();
    this.response.then(data => {
      arr = data.raw;
      // console.log(arr);

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

      this.hideLoading = true;
    });
  }

  collateItemChildren() {
    this.zoteroItems.forEach(item => {
      if (typeof item.data.parentItem == 'undefined') {
        item.childItems = [];
        this.zoteroItems.forEach(innerItem => {
          if (innerItem.data.parentItem == item.key) {
            item.childItems.push(innerItem);
          }
        });
      }
    });

    // console.log(this.zoteroItems);

  }

  createNavArray(arr) {
    arr.sort(function(a, b) {
        var textA = a.data.parentCollection;
        var textB = b.data.parentCollection;
        return (textA == false) ? -1 : 0;
    });

    return arr;
  }

  getNestedChildren(arr, parent) {
    var out = [];

    for(var i in arr) {
      if(arr[i].data.parentCollection == parent) {
        var outVar: CollectionsNav = {
          key: arr[i].data.key,
          name: arr[i].data.name
        }

        var children = this.getNestedChildren(arr, arr[i].data.key);

        if (children.length) {
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

  checkType(type) {
    switch (type) {
      case 'attachment':
        return false;
        break;
      case 'note':
        return false;
        break;
      default:
        return true;
        break;
    }
  }

  toggleLoader() {
    this.hideLoading = !this.hideLoading;
  }

  openItemDialog(item) {
    var selectedItem = item;
    let dialogRef = this.dialog.open(ZoteroDialogContComponent, {
      data: selectedItem
    });

  }

}
