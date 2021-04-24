import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition, state, AnimationEvent } from '@angular/animations';
import { DbHttpService } from '../../../shared/services/db-http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subtitle } from './i-subtitle';
import { Language } from './i-language';
import { SubtitleTextVersions } from './i-subtitle';
import { MediaTimecodePipe } from '../../../shared/pipes/media-timecode.pipe';

@Component({
  selector: 'app-subtitles',
  templateUrl: './subtitles.component.html',
  styleUrls: ['./subtitles.component.css'],
  animations: [
    trigger('fade', [
      state('sub_in', style({
        opacity: 1
      })),
      state('sub_out', style({
        opacity: 0
      })),
      transition('sub_out => sub_in', [
        animate('.5s 0ms ease-in')
      ]),
      transition('sub_in => sub_out', [
        animate('.5s 0ms ease-in')
      ])
    ])
  ]
})
export class SubtitlesComponent implements OnInit {

  // FOR FUTURE: https://angular.io/guide/reactive-forms#creating-dynamic-forms
  // create and access a dynamic form Array for each language of a subtitle

  currentTimeSubs: number;
  @Input() set currentTime(value: number) {
    let currTime = this.currentTimeSubs;
    this.currentTimeSubs = value;

    if (Math.abs(value - currTime) > .5) {
      // console.log('Delta: ' + value + ' | ' + currTime);
      this.indexSubtitleQueue();
    }
    this.displaySubtitle(this.currentTimeSubs);
  }
  @Output() revPlayhead = new EventEmitter<string>();
  @Output() forwardPlayhead = new EventEmitter<string>();
  @Output() pauseMedia = new EventEmitter<string>();
  currentTimeIn: number = 0;
  currentTimeOut: number = 0;
  @Input() playing: boolean;
  @Input() subsToggle: boolean;
  @Input() language: number;

  subtitleForm: FormGroup;
  textVersions1 = new FormControl('');
  textVersions2 = new FormControl('');
  textVersions3 = new FormControl('');

  subtitles: Subtitle[];
  subtitlesQueue: Subtitle[];
  subtitle: Subtitle;
  subtitle_current: Subtitle = {
    id: null,
    tc_in: null,
    tc_out: null,
    text_versions: []
  };
  subtitle_live: Subtitle = {
    id: null,
    tc_in: null,
    tc_out: null,
    text_versions: []
  };
  languages: Language[];
  showSub: boolean = false;
  disableButton: boolean = true;
  enableSubtitleForm: boolean = false;

  constructor(private dbHttpService: DbHttpService,
    private mediaTimecode: MediaTimecodePipe,
    fb: FormBuilder
  ) {
    this.subtitleForm = fb.group({
      textVersions1: this.textVersions1,
      textVersions2: this.textVersions2,
      textVersions3: this.textVersions3
    });
  }

  ngOnInit() {
    this.getSubtitles();
    this.getLanguages();
  }

  ngAfterViewInit() {
  }

  getSubtitles() {
    this.dbHttpService.getSubtitles()
    .subscribe(subtitles => {
      subtitles.sort(function(a, b) {
        var timeA = a.tc_in;
        var timeB = b.tc_in;
        return (timeA < timeB) ? -1 : (timeA > timeB) ? 1 : 0;
      });

      this.subtitles = JSON.parse(JSON.stringify(subtitles));
      this.subtitlesQueue = JSON.parse(JSON.stringify(subtitles));
      // console.log('orig subtitles:');
      // console.log(this.subtitles);
      //
      // console.log('orig subtitlesQueue:');
      // console.log(this.subtitlesQueue);
    });
  }

  getLanguages() {
    this.dbHttpService.getLanguages()
    .subscribe(languages => {
      this.languages = languages;
    });
  }

  displaySubtitle(tc) {
    if (this.playing && this.subsToggle) {
      if (this.subtitle_current.id == null && this.subtitlesQueue.length > 0) {
        this.subtitle_current = this.subtitlesQueue.shift();
        // console.log(this.subtitle_current);
      }

      if (this.subtitle_current.id != null) {
        if (tc >= this.subtitle_current.tc_in
          && tc <= this.subtitle_current.tc_out
          && !this.showSub) {

          // console.log(tc + ' >= ' + this.subtitle_current.tc_in
          //   + ' && ' + tc + ' <= ' + this.subtitle_current.tc_out);

          this.subtitle_live = this.subtitle_current;
          this.showSub = true;
          // console.log(this.subtitle_live);
        }
        else if (this.subtitle_current.tc_out < tc ) {
          // console.log(this.subtitle_current.tc_out + ' > ' + tc);

          this.showSub = false;
          this.resetSubtitleCurrent();

          setTimeout(() => {
            this.resetSubtitleLive();
          }, 500);
        }
      }
    }
  }

  indexSubtitleQueue() {
    this.subtitlesQueue = [];
    // console.log('Index Subtitles Array:');
    // console.log(this.subtitles);
    // console.log('Index SubtitlesQueue Array 1:');
    // console.log(this.subtitlesQueue);


    this.subtitles.forEach((sub, index) => {
      // console.log('Index Push?: ' + sub.tc_in + ' > ' + this.currentTimeSubs);

      if (sub.tc_in > this.currentTimeSubs) {
        this.subtitlesQueue.push(sub);
        // console.log(sub);
        // console.log('Index added');
      }
    });

    // console.log('Index SubtitlesQueue Array 2:');
    // console.log(this.subtitlesQueue);
    this.resetSubtitleLive();
    this.resetSubtitleCurrent();
    this.showSub = false;
  }

  resetSubtitleCurrent() {
    this.subtitle_current = {
      id: null,
      tc_in: null,
      tc_out: null,
      text_versions: []
    };
  }

  resetSubtitleLive() {
    this.subtitle_live = {
      id: null,
      tc_in: null,
      tc_out: null,
      text_versions: []
    };
  }

  replay(delta) {
    this.revPlayhead.emit(delta);
    this.indexSubtitleQueue();
  }

  forward(delta) {
    this.forwardPlayhead.emit(delta);
    this.indexSubtitleQueue();
  }

  pausePlayerMedia() {
    this.pauseMedia.emit();
  }

  editSubtitle(subtitle) {
    this.subtitle = subtitle;
    this.pausePlayerMedia();
    this.toggleSubtitleForm();
    this.subtitleForm.patchValue({
      textVersions1: this.subtitle.text_versions[0].text,
      textVersions2: this.subtitle.text_versions[1].text,
      textVersions3: this.subtitle.text_versions[2].text
    });
  }

  setSubtitleInPoint() {
    this.subtitle.tc_in = this.currentTimeSubs;
    console.log(this.subtitle.tc_in);
  }

  setSubtitleOutPoint() {
    this.subtitle.tc_out = this.currentTimeSubs;
    console.log(this.subtitle.tc_out);
  }

  toggleSubtitleForm() {
    this.enableSubtitleForm = !this.enableSubtitleForm;
  }

  onSubmit() {
    console.log('Update:');
    this.subtitle.text_versions[0].text = this.subtitleForm.value.textVersions1;
    this.subtitle.text_versions[1].text = this.subtitleForm.value.textVersions2;
    this.subtitle.text_versions[2].text = this.subtitleForm.value.textVersions3;
    console.log(this.subtitle);

    if (this.subtitle) {
      this.updateSubtitle(this.subtitle);
    }
    else {
      console.log('Add:');
      console.log(this.subtitle);
      // var subtitle: Subtitle = {
      //   tc_in: this.currentTimeIn,
      //   tc_out: this.currentTimeOut,
      //   text: this.subtitleForm.value.text
      // }
      // this.add(subtitle);
    }
  }

  // add(subtitle: Subtitle): void {
  //   if (!subtitle) { return; }
  //   this.dbHttpService.addSubtitle(subtitle as Subtitle)
  //     .subscribe(subtitle => {
  //       this.getSubtitles();
  //       this.toggleSubtitleForm();
  //       console.log('Added:');
  //       console.log(subtitle);
  //   });
  //
  // }

  updateSubtitle(subtitle: Subtitle): void {
    if (!subtitle) { return; }
    this.dbHttpService.updateSubtitle(subtitle)
      .subscribe(() => {
        this.replay(this.currentTimeSubs - subtitle.tc_in + 5);
        this.getSubtitles();
        this.subtitle_live = subtitle;
        this.showSub = false;
        this.toggleSubtitleForm();
      });
  }

  onReset() {
    console.log('reset');
    this.subtitleForm.reset();
    this.toggleSubtitleForm();
    delete this.subtitle;
  }

  toggleButtonOn() {
    this.disableButton = false;
  }

  onAnimationEvent( event: AnimationEvent ) {
    // Add to HTML tag for troubleshooting
    // (@fade.start)="onAnimationEvent($event)" (@fade.done)="onAnimationEvent($event)"

    // openClose is trigger name in this example
    // console.warn(`Animation Trigger: ${event.triggerName}`);

    // phaseName is start or done
    // console.warn(`Phase: ${event.phaseName}`);

    // in our example, totalTime is 1000 or 1 second
    // console.warn(`Total time: ${event.totalTime}`);

    // in our example, fromState is either open or closed
    console.warn(`From: ${event.fromState}`);

    // in our example, toState either open or closed
    console.warn(`To: ${event.toState}`);

    // the HTML element itself, the button in this case
    // console.warn(`Element: ${event.element}`);

    console.log('Done');

  }

}
