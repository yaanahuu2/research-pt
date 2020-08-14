import { Component, OnInit } from '@angular/core';
import { LookbookService } from '../../services/lookbook.service';
import { Lookbook } from '../../types/types';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.css']
})
export class LookbookComponent implements OnInit {

  lookbookID: string = "2";
  lookbook: Lookbook;

  constructor(private lookbookService: LookbookService) { }

  ngOnInit(): void {
    this.lookbookService.getLookbookByID(this.lookbookID).subscribe((book: Lookbook)=>{
      this.lookbook = book;
    })
  }

}
