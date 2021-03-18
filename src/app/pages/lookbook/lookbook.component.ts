import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from 'rxjs/operators';

import { LookbookService } from '../../shared/services/lookbook.service';
import { Lookbook } from '../../shared/types/types';
import { ObservableInput } from 'rxjs';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.css']
})
export class LookbookComponent implements OnInit {

  // lookbookID: string = "2";
  lookbook: Lookbook;

  constructor(private lookbookService: LookbookService, private route: ActivatedRoute, private router: Router) {
    this.route.params
     .pipe(map(params=>params['id']))
     .pipe(switchMap((id:string):ObservableInput<any>=>{
       return this.lookbookService.getLookbookByID(id);
     }))
     .subscribe((data:Lookbook)=>{
       if(!data) return this.navigateToMaster();
       this.lookbook = data;
     });
   }

  ngOnInit(): void {
  }

  private navigateToMaster(): void{
       this.router.navigate(['/lookbooks']);
  }

}
