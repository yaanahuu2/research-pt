import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, filter } from 'rxjs/operators';

import { LookbookService } from '../../services/lookbook.service';
import { Lookbook } from '../../types/types';
import { ObservableInput } from 'rxjs';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.css']
})
export class LookbookComponent implements OnInit {

  // lookbookID: string = "2";
  lookbook: Lookbook;

  constructor(private lookbookService: LookbookService, private route: ActivatedRoute) {
    this.route.params
     .pipe(map(params=>params['id']))
     .pipe(switchMap((id:string):ObservableInput<any>=>{
       return this.lookbookService.getLookbookByID(id);
     }))
     .subscribe((data:Lookbook)=>{
       this.lookbook = data;
     })
   }

  ngOnInit(): void {
  }

}
