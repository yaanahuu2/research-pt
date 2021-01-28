import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-zotero-dialog-cont',
  templateUrl: './zotero-dialog-cont.component.html',
  styleUrls: ['../zotero.component.css', './zotero-dialog-cont.component.css']
})
export class ZoteroDialogContComponent implements OnInit {

  key: string;
  formType = 'zotero';

  constructor( @Inject(MAT_DIALOG_DATA) public item: any ) {}

  ngOnInit() {
  }

}
