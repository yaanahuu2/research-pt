import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ICollectionsNav } from '../ICollectionsNav';

@Component({
  selector: 'app-material-tree',
  templateUrl: './material-tree.component.html',
  styleUrls: ['./material-tree.component.css']
})

export class MaterialTreeComponent {
  @Output() collectionKey = new EventEmitter<string>();
  @Output() collectionName = new EventEmitter<string>();
  @Output() collectionTag = new EventEmitter<string>();
  // @Output() hideLoadingItems = new EventEmitter<boolean>();
  activeNode: any;

  treeControl = new NestedTreeControl<ICollectionsNav>(node => node.children);
  @Input() nestedDataSource = new MatTreeNestedDataSource<ICollectionsNav>();

  constructor() { }

  hasChild = (_: number, node: ICollectionsNav) => !!node.children && node.children.length > 0;

  private _getChildren = (node: ICollectionsNav) => node.children;

  loadCollectionItems(key: string, name: string) {
    this.collectionKey.emit(key);
    this.collectionName.emit(name);
    this.collectionTag.emit(name);
  }

}
