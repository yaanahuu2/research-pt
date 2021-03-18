import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition, state, AnimationEvent } from '@angular/animations';
import { DbHttpService } from '../../../shared/services/db-http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subtitle } from './i-subtitle';
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
      transition('sub_in => sub_out', [
        animate('.5s 0ms ease-out')
      ]),
      transition('sub_out => sub_in', [
        animate('.5s 0ms ease-in')
      ])
    ])
  ]
})
export class SubtitlesComponent implements OnInit {

  currentTimeSubs: number;
  @Input() set currentTime(value: number) {
    this.currentTimeSubs = value;
    this.displaySubtitle(this.currentTimeSubs);
  }
  @Output() revPlayhead = new EventEmitter<string>();
  @Output() forwardPlayhead = new EventEmitter<string>();
  @Output() pauseMedia = new EventEmitter<string>();
  currentTimeIn: number = 0;
  currentTimeOut: number = 0;
  @Input() playing: boolean;
  @Input() subsToggle: boolean;

  subtitleForm: FormGroup;
  text_versions_1 = new FormControl('');
  text_versions_2 = new FormControl('');
  text_versions_3 = new FormControl('');

  subtitles: Subtitle[];
  subtitle: Subtitle;
  subtitle_live: Subtitle = {
    id: null,
    tc_in: null,
    tc_out: null,
    text_versions: []
  };
  showSub: boolean = false;
  disableButton: boolean = true;
  enableSubtitleForm: boolean = false;

  constructor(private dbHttpService: DbHttpService,
    private mediaTimecode: MediaTimecodePipe,
    fb: FormBuilder
  ) {
    this.subtitleForm = fb.group({
      text: this.text
    });
  }

  ngOnInit() {
    this.getSubtitles();
  }

  ngAfterViewInit() {
  }

  getSubtitles() {
    this.dbHttpService.getSubtitles()
    .subscribe(subtitles => {
      this.subtitles = subtitles;
      console.log(this.subtitles);
    });


  }

  displaySubtitle(tc) {
    if (this.playing && this.subsToggle) {
      var subOn: boolean = false;
      this.subtitles.forEach(sub => {
        if (tc >= sub.tc_in && tc <= sub.tc_out) {
          if (this.subtitle_live.id == sub.id) {
            subOn = true;
            return;
          }
          else {
            this.resetSubtitle();
          }

          this.subtitle_live = sub;
          this.showSub = true;
          subOn = true;
          return;
        }
      });

      if (!subOn) {
        this.showSub = false;
      }
    }
  }

  toggleSubFade() {
    this.showSub = !this.showSub;
  }

  resetSubtitle() {
    this.subtitle_live = {
      id: null,
      tc_in: null,
      tc_out: null,
      text_versions: []
    };
  }

  replay(delta) {
    this.revPlayhead.emit(delta);
  }

  forward(delta) {
    this.forwardPlayhead.emit(delta);
  }

  pausePlayerMedia() {
    this.pauseMedia.emit();
  }

  editSubtitle(subtitle) {
    this.subtitle = subtitle;
    this.pausePlayerMedia();
    this.toggleSubtitleForm();
    this.currentTimeIn = this.subtitle.tc_in;
    this.currentTimeOut = this.subtitle.tc_out;
    this.subtitleForm.patchValue({
      text_versions_1: this.subtitle.text_versions[1],
      text_versions_2: this.subtitle.text_versions[2],
      text_versions_3: this.subtitle.text_versions[3]
    });
  }

  toggleSubtitleForm() {
    this.enableSubtitleForm = !this.enableSubtitleForm;
  }

  onSubmit() {
    if (this.subtitle) {
      var subtitle: Subtitle = {
        id: this.subtitle.id,
        tc_in: this.currentTimeIn,
        tc_out: this.currentTimeOut,
        text: this.subtitleForm.value.text
      }
      console.log(subtitle);
      this.updateSubtitle(subtitle);
    }
    else {
      var subtitle: Subtitle = {
        tc_in: this.currentTimeIn,
        tc_out: this.currentTimeOut,
        text: this.subtitleForm.value.text
      }
      console.log(subtitle);
      this.add(subtitle);
    }
  }

  add(subtitle: Subtitle): void {
    if (!subtitle) { return; }
    this.dbHttpService.addSubtitle(subtitle as Subtitle)
      .subscribe(subtitle => {
        this.getSubtitles();
        this.toggleSubtitleForm();
        console.log('Added:');
        console.log(subtitle);
    });

  }

  updateSubtitle(subtitle: Subtitle): void {
    if (!subtitle) { return; }
    this.dbHttpService.updateSubtitle(subtitle)
      .subscribe(() => {
        this.replay(this.currentTimeSubs - subtitle.tc_in + 2);
        this.getSubtitles();
        this.subtitle_live = subtitle;
        this.showSub = false;
        this.toggleSubtitleForm();
        console.log(this.showSub);

      });
  }

  resetSubtitleForm() {
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
