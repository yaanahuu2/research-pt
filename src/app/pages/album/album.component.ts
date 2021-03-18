import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { ObservableInput } from 'rxjs';
import { DbHttpService } from '../../shared/services/db-http.service';
import { AlbumItems } from '../albums/albums';
import { Albums } from '../albums/albums';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  console = console;
  albumItems: AlbumItems;
  album: Albums;
  album_id: number;
  itemSelections: any = [];

  constructor(
    private dbHttpService: DbHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.route.params
     .pipe(map(params=>params['id']))
     .pipe(switchMap((id:number):ObservableInput<any>=>{
      this.album_id = id;
       return this.dbHttpService.getAlbumItems(id);
     }))
     .subscribe((data:AlbumItems)=>{
       if(!data) return this.navigateToMaster();
       this.albumItems = data;
     });
  }

  ngOnInit(): void {
  }

  getAlbum() {
    this.dbHttpService.getAlbum(this.album_id)
    .subscribe(album => this.album = album);
  }

  selectItem(albumItem) {
    if (this.itemSelections.indexOf(albumItem) < 0) {
      this.itemSelections.push(albumItem);
      console.log(this.itemSelections);
    }
  }

  goBack(): void {
    this.location.back();
  }

  private navigateToMaster(): void{
       this.router.navigate(['/albums']);
  }

}
