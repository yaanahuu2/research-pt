import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { CollectionsNav } from '../collectionsnav';

@Component({
  selector: 'app-material-tree',
  templateUrl: './material-tree.component.html',
  styleUrls: ['./material-tree.component.css']
})

export class MaterialTreeComponent {
  @Output() collectionKey = new EventEmitter<string>();
  // @Output() hideLoading = new EventEmitter<boolean>();
  activeNode: any;

  treeControl = new NestedTreeControl<CollectionsNav>(node => node.children);
  @Input() nestedDataSource = new MatTreeNestedDataSource<CollectionsNav>();

  constructor() { }

  hasChild = (_: number, node: CollectionsNav) => !!node.children && node.children.length > 0;

  private _getChildren = (node: CollectionsNav) => node.children;

  loadCollectionItems(key: string) {
    this.collectionKey.emit(key);
  }

}
