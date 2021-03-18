import { Component, OnInit, Input } from '@angular/core';
import api from 'zotero-api-client';
import { environment } from '../../../../environments/environment';
import { DbHttpService } from '../../../shared/services/db-http.service';

export interface ZoteroAttachment {
  key: string;
  filename: string;
  is_image: boolean;
  url: string;
}

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: [
    './file-list.component.css',
    '../zotero-dialog-cont/zotero-dialog-cont.component.css',
    '../zotero.component.css'
  ]
})
export class FileListComponent implements OnInit {

  @Input() key: string;
  @Input() childItems: any;

  auth_key = environment.auth_key;
  group = environment.group;
  attachments: ZoteroAttachment[] = [];

  constructor(private dbHttpService: DbHttpService) { }

  ngOnInit(): void {
    this.getFileURLs();
  }

  getFileURLs() {
    var attachment: ZoteroAttachment;
    var fileresp: any;

    this.childItems.forEach(child => {
      if (child.data.itemType == 'attachment') {
        fileresp = api(this.auth_key).library('group', this.group).items(child.key).attachmentUrl().get();
        fileresp.then(data => {
          var is_image: boolean = (child.data.contentType.indexOf('image') > -1) ? true : false;
          attachment = {
            key: child.data.key,
            filename: child.data.filename,
            is_image: is_image,
            url: data.raw
          }

          this.attachments.push(attachment);
        });
      }
    });
  }

  getAttachmentFile(key: string) {
    console.log(key);
    var fileObj: Object;
    var resp: any;
    var fileresp: any;

    resp = api(this.auth_key).library('group', this.group).items(key).get();
    resp.then(data => {
      fileObj = data.raw;
      fileresp = api(this.auth_key).library('group', this.group).items(key).attachmentUrl().get();
      // fileresp = api(this.auth_key).library('group', this.group).items(key).attachment(fileObj.fileName, fileObj.file, fileObj.mtime).get();
      fileresp.then(data => {
        console.log(data.raw);
        window.open(data.raw);
      });
    });
  }

}
