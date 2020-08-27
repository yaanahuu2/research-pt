import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  spinnerMode: string = "indeterminate";
  percentLoaded: string = "0";

  constructor() { }

  ngOnInit(): void {
  }

  private setLoaded(){
    this.spinnerMode = "determinate";
    this.percentLoaded = "100";
  }
}
