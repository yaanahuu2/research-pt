import { Component, OnInit } from '@angular/core';
import { DbHttpService } from '../../services/db-http.service';
import { AlbumItems } from './albums';
import { Albums } from './albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  console = console;
  albums: Albums[];

  constructor(private dbHttpService: DbHttpService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.dbHttpService.getAlbums()
    .subscribe(albums => this.albums = albums);
  }

}
