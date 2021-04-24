import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-timeline-dialog',
  templateUrl: './timeline-dialog.component.html',
  styleUrls: ['./timeline-dialog.component.css', '../../../pages/zotero/zotero.component.css', '../../../pages/zotero/zotero-dialog-cont/zotero-dialog-cont.component.css']
})
export class TimelineDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public item: any ) {}

  ngOnInit(): void {
  }

}
