import { Component, OnInit } from '@angular/core';
import { LookbookService } from '../../services/lookbook.service';
import { Lookbook } from '../../types/types';

@Component({
  selector: 'app-lookbooks',
  templateUrl: './lookbooks.component.html',
  styleUrls: ['./lookbooks.component.css']
})
export class LookbooksComponent implements OnInit {
  lookbooks: Lookbook[];
  mockPageLoadTimeout: number = 1500;
  messageFromLoader: string = "SUCCESS";
  loaded: boolean = false;

  constructor( private lookbookService: LookbookService ) { }

  ngOnInit(): void {
    this.lookbookService.getLookbooks().subscribe((data: Lookbook[])=>{
      this.lookbooks = data;
    });
    this.lookbookService.mockPageLoad(this.mockPageLoadTimeout).subscribe((response: boolean)=>{
      this.loaded = response;
    })
  }

}
