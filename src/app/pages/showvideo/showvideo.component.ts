import { Component, OnInit } from '@angular/core';
import { VideoComponent } from '../../components/video/video.component';

@Component({
  selector: 'app-showvideo',
  templateUrl: './showvideo.component.html',
  styleUrls: ['./showvideo.component.css']
})
export class ShowvideoComponent implements OnInit {

  // Testing components
  video_url: string = 'http://dev.jaalen.net/research-pt/video/FracturedLandTrailer.mp4';
  playerId: number = 19;

  constructor() { }

  ngOnInit(): void {
  }

}
