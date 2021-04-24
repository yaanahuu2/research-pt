import { Component, ElementRef, ViewChild, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {trigger, style, animate, transition} from '@angular/animations';
import { VideoService } from '../../shared/services/video.service';
import { StreamState } from "./i-stream-state";
import { MediaTimecodePipe } from '../../shared/pipes/media-timecode.pipe';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({opacity: 1}))
      ])
    ])
  ]
})
export class VideoComponent {

  @ViewChild('videoTag') videoTag: ElementRef;
  @ViewChild('videoViewer') videoViewer: ElementRef;
  @Input() url: string;
  @Input() playerId: number;

  videoEl: any;
  commentary_live: Array<string> = [];
  commentary: Array<any> = [
    {
      'img_src': './assets/harper.png',
      'text': 'Harper\'s a real ass.'
    },
    {
      'text': 'He would drink oil with his breakfast if he could.'
    },
    {
      'text': 'I hope he gets eaten by a sealion.'
    }
  ];
  language: number = 3;

  // Buttons
  playPauseButton: string = 'play_arrow';
  fullscreenButton: string = 'fullscreen';
  subtitlesButton: string = 'subtitles';
  commentsButton: string = 'speaker_notes';

  state: StreamState;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public videoService: VideoService,
    private mediaTimecode: MediaTimecodePipe
  ) {
    // listen to stream state
    this.videoService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }

  ngAfterViewInit() {
     // Do something with this.videoTag
     this.videoEl = this.videoTag.nativeElement;
     this.videoService.setVideoEl(this.videoEl);
     // this.videoService.setPlayerId(this.playerId);
     this.playStream(this.playerId, this.url);
  }

  playStream(playerId, url) {
    this.videoService.playStream(playerId, url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  playPause(playerId, url) {
    if (!this.state.playing) {
      this.play();
    }
    else {
      this.pause();
    }
  }

  pause() {
    this.videoService.pause();
    this.playPauseButton = 'play_arrow';
  }

  play() {
    this.videoService.play();
    this.playPauseButton = 'pause';
  }

  stop() {
    this.videoService.stop();
  }

  seekTo(tc: number): void {
    this.videoService.seekTo(tc);
  }

  replay(delta: number) {
    this.seekTo(this.state.currentTime - delta);
  }

  forward(delta: number) {
    this.seekTo(this.state.currentTime + delta);
  }

  onSliderChangeEnd(change) {
    this.videoService.seekTo(change.value);
  }

  formatLabel(tc: number) {
    var mN = Math.floor(tc / 60);
    var sN = Math.floor(tc - Number(mN) * 60);
    var m: string = mN < 10 ? "0" + String(mN) : String(mN);
    var s: string = sN < 10 ? "0" + String(sN) : String(sN);
    return `${m}:${s}`;
  }

  toggleSubtitles() {
    this.state.subsToggle = !this.state.subsToggle;
    this.subtitlesButton = (this.state.subsToggle) ? 'subtitles' : 'subtitles_off';
  }

  toggleLanguage() {
    if (this.state.language == 3) {
      this.state.language = 1;
    }
    else if (this.state.language == 1) {
      this.state.language = 2;
    }
    else if (this.state.language == 2) {
      this.state.language = 3;
    }
    console.log(this.state.language);
  }

  toggleComments() {
    this.state.commsToggle = !this.state.commsToggle;
    this.commentsButton = (this.state.commsToggle) ? 'speaker_notes' : 'speaker_notes_off';
  }

  /* View in fullscreen */
  toggleFullscreen() {
    var elem = this.videoViewer.nativeElement;
    if (!document.fullscreenElement) {
      elem.webkitRequestFullscreen();
      this.fullscreenButton = 'fullscreen_exit';
    }
    else {
      /* Close fullscreen */
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.fullscreenButton = 'fullscreen';
      }
    }
  }

}


// onTimeUpdate(data) {
//   this.currentTimeRounded = Math.floor(data.target.currentTime);
//   this.hrTime = this.convertToHRTime(this.currentTimeRounded);
//
//   // Commentaries
//   if (this.commsToggle) {
//     if (this.currentTimeRounded == 5 && this.index == 0) {
//       this.commentary_live.push(this.commentary[this.index]);
//       this.index++;
//     }
//     else if (this.currentTimeRounded == 9 && this.index == 1) {
//       this.commentary_live.push(this.commentary[this.index]);
//       this.index++;
//     }
//     else if (this.currentTimeRounded == 14 && this.index == 2) {
//       this.commentary_live.push(this.commentary[this.index]);
//       this.index++;
//     }
//   }
// }
