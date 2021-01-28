import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.css']
})
export class CategoryTreeComponent implements OnInit {

  tree_id: number;
  tree: CategoryTree[];

  constructor() { }

  ngOnInit(): void {
  }

  getCategoryTree() {
    this.dbHttpService.getCategoryTree(this.tree_id)
    .subscribe(album => this.tree_id = album);
  }

}
