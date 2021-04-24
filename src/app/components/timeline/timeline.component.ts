import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, from } from 'rxjs';
import api from 'zotero-api-client';
import { environment } from '../../../environments/environment';
import { DbHttpService } from '../../shared/services/db-http.service';
import { StripHtmlPipe } from '../../shared/pipes/strip-html.pipe';
import { SortDatePipe } from '../../shared/pipes/sort.pipe';
import { TimelineItem } from './i-timeline-item';
import { ZoteroItem } from './i-zotero-item';
import { MatDialog } from '@angular/material/dialog';
import { TimelineDialogComponent } from './timeline-dialog/timeline-dialog.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  timelineItems: TimelineItem[] = [];
  response: any;
  auth_key = environment.auth_key;
  group = environment.group;
  isLoading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private dbHttpService: DbHttpService,
    private stripHtml: StripHtmlPipe,
    private sortDate: SortDatePipe
  ) { }

  ngOnInit(): void {
    // this.getTimelineItems();
    this.getCollections();
  }

  // Need to ensure it works with BCE dates

  getCollections() {
    var collections = [];

    this.response = api(this.auth_key).library('group', this.group).items().get({ limit: 1000, itemType: 'patent' });
    this.response.then(data => {
      this.getEventsFromZotero(data.raw);
      this.isLoading = false;
    });
  }

  getEventsFromZotero(data): any {
    const request = (key: string) => api(this.auth_key).library('group', this.group).items(key).get();

    data.forEach((item, index) => {
      var relationKeys: string[] = [];
      var zRelations = item.data.relations;
      var relations: string[] = [];

      if (JSON.stringify(zRelations) !== '{}') {
        if (Array.isArray(zRelations['dc:relation'])) {
          zRelations['dc:relation'].forEach(rel => {
            relationKeys.push(rel.split('/').pop());
          });
        }
        else {
          relationKeys.push(zRelations['dc:relation'].split('/').pop());
        }
      }

      if (relationKeys.length > 0) {
        forkJoin(
          relationKeys.map(key => request(key))
        )
        .subscribe(relations => {
          let timelineItem: TimelineItem = {
            key: item.data.key,
            datetime: item.data.issueDate,
            title: item.data.title,
            abstract: item.data.abstractNote,
            relations: relations
          }

          this.timelineItems.push(timelineItem);
        });
      }

    });
  }

  getItemRelation(key) {
    console.log(key);

  }

  openItemDialog(relation) {
    var title: string = relation.getData().itemType == 'note' ? 'Note' : relation.getData().title;

    let itemRelation: ZoteroItem = {
      key: relation.getData().key,
      date: relation.getData().date,
      title: title,
      note: relation.getData().note,
      itemType: relation.getData().itemType,
      url: relation.getData().url,
      tags: relation.getData().tags,
      parentItem: relation.getData().parentItem,
      abstract: relation.getData().abstract
    }

    let dialogRef = this.dialog.open(TimelineDialogComponent, {
      data: itemRelation
    });

  }

  // getTimelineItems(): void {
  //   this.dbHttpService.getTimelineItems()
  //   .subscribe(timelineItems => this.timelineItems = timelineItems);
  // }

}
