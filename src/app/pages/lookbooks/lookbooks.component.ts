import { Component, OnInit, ViewChild } from '@angular/core';
import { LookbookService } from '../../services/lookbook.service';
import { Lookbook } from '../../types/types';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lookbooks',
  templateUrl: './lookbooks.component.html',
  styleUrls: ['./lookbooks.component.css']
})
export class LookbooksComponent implements OnInit {
  lookbooks: MatTableDataSource<Lookbook> = new MatTableDataSource<Lookbook>();
  displayedColumns: string[] = ["id","name","author"];
  mockPageLoadTimeout: number = 1500;
  messageFromLoader: string = "SUCCESS";
  loaded: boolean = false;

  constructor( private lookbookService: LookbookService ) { }

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.lookbooks.paginator = this.paginator;
    this.lookbookService.getLookbooks().subscribe((data: Lookbook[])=>{
      this.lookbooks = new MatTableDataSource(data);
    });
    this.lookbookService.mockPageLoad(this.mockPageLoadTimeout).subscribe((response: boolean)=>{
      this.loaded = response;
    })
  }

}
