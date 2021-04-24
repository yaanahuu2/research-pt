import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StreamState } from '../../components/video/i-stream-state';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private stop$ = new Subject();
  private videoEl: any;
  private playerId: number;
  videoEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
    'waiting'
  ];
  private state: StreamState = {
    playing: false,
    playerId: undefined,
    subsToggle: true,
    commsToggle: false,
    duration: undefined,
    currentTime: undefined,
    language: 3,
    canplay: false,
    waiting: false,
    error: false,
  };

  setVideoEl(videoEl) {
      this.videoEl = videoEl;
  }

  setPlayerId(playerId) {
      this.playerId = playerId;
  }

  private streamObservable(playerId, url) {
    return new Observable(observer => {
      this.playerId = playerId;
      // Play video
      // Promise error: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
      this.videoEl.src = url;
      this.videoEl.load();
      // this.videoEl.play();
      this.videoEl.onwaiting = (event) => {
        // console.log(this.videoEl.waiting + ' Video is waiting for more data: ' + event);
        // console.log(event);

      };

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.videoEl, this.videoEvents, handler);
      return () => {
        // Stop Playing
        this.videoEl.pause();
        this.videoEl.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.videoEl, this.videoEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private addEvents(obj, events, handler) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  playStream(playerId, url) {
    return this.streamObservable(playerId, url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.videoEl.play();
  }

  pause() {
    this.videoEl.pause();
  }

  stop() {
    this.stop$.next();
  }

  seekTo(seconds) {
    this.videoEl.currentTime = seconds;
  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case 'canplay':
        this.state.playerId = this.playerId;
        this.state.duration = this.videoEl.duration;
        this.state.canplay = true;
        break;
      case 'playing':
        this.state.playing = true;
        this.state.waiting = false;
        break;
      case 'pause':
        this.state.playing = false;
        break;
        case 'waiting':
          this.state.waiting = true;
          break;
      case 'timeupdate':
        this.state.currentTime = this.videoEl.currentTime;
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      playerId: undefined,
      subsToggle: true,
      commsToggle: false,
      duration: undefined,
      currentTime: undefined,
      language: 3,
      canplay: false,
      waiting: false,
      error: false
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }
}
