import { Component, OnInit } from '@angular/core';
import api from 'zotero-api-client';
import { environment } from '../../../environments/environment';
import { DbHttpService } from '../../shared/services/db-http.service';
import { StripHtmlPipe } from '../../shared/pipes/strip-html.pipe';
import { TimelineItem } from './i-timeline-item';

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

  constructor(private dbHttpService: DbHttpService, private stripHtml: StripHtmlPipe) { }

  ngOnInit(): void {
    // this.getTimelineItems();
    this.getCollections();
  }

  // Need to ensure it works with BCE dates

  getCollections() {
    var collections = [];

    this.response = api(this.auth_key).library('group', this.group).items().get({ limit: 1000 });
    this.response.then(data => {
      collections = data.raw;
      this.getEventsFromZotero(data.raw);
      this.isLoading = false;
    });
  }

  getEventsFromZotero(data): any {
    data.forEach(item => {
      if (item.data.itemType === 'patent') {
        // console.log(item.data);
        var relations: string[] = [];
        // console.log(item.data.relations);
        var zRelations = item.data.relations;

        if (JSON.stringify(zRelations) !== '{}') {
          if (Array.isArray(zRelations['dc:relation'])) {
            zRelations['dc:relation'].forEach(rel => {
              var itemRelationKey = rel.split('/').pop();
              data.forEach(innerItem => {
                if (innerItem.key === itemRelationKey) {
                  relations.push(innerItem.data);
                }
              });
            });
          }
          else {
            var itemRelationKey = zRelations['dc:relation'].split('/').pop();
            data.forEach(innerItem => {
              if (innerItem.key === itemRelationKey) {
                relations.push(innerItem.data);
              }
            });
          }
        }

        console.log(relations);


        let timelineItem: TimelineItem = {
          key: item.data.key,
          datetime: item.data.issueDate,
          title: item.data.title,
          abstract: item.data.abstractNote,
          relations: relations
        }

        this.timelineItems.push(timelineItem);
      }
    });

    this.timelineItems.sort(function(a, b) {
        var dateA = new Date(a.datetime);
        var dateB = new Date(b.datetime);
        return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
    });
  }

  getItemRelation(key) {
    console.log(key);

  }

  getTimelineItems(): void {
    this.dbHttpService.getTimelineItems()
    .subscribe(timelineItems => this.timelineItems = timelineItems);
  }

}
