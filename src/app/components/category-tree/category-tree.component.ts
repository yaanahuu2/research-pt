import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { DbHttpService } from '../../shared/services/db-http.service';
import {CategoryTree} from './category-tree';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.css']
})
export class CategoryTreeComponent implements OnInit {

  tree_id: number;
  tree: CategoryTree[];

  constructor(private dbHttpService: DbHttpService) { }

  ngOnInit(): void {
    this.tree_id = 1;
    this.getCategoryTree();

  }

  ngAfterViewChecked(): void {
    console.log(this.tree);
  }

  getCategoryTree() {
    this.dbHttpService.getCategoryTree(this.tree_id)
    .subscribe(tree => this.tree = tree);
  }

}
