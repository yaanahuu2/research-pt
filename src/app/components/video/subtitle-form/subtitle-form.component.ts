import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DbHttpService } from '../../../shared/services/db-http.service';
import { Subtitle } from '../subtitles/i-subtitle';
import { MediaTimecodePipe } from '../../../shared/pipes/media-timecode.pipe';

@Component({
  selector: 'app-subtitle-form',
  templateUrl: './subtitle-form.component.html',
  styleUrls: ['./subtitle-form.component.css']
})
export class SubtitleFormComponent implements OnInit {

  @Input() currentTime: number;
  @Output() buttonClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  currentTimeIn: number;
  currentTimeOut: number;

  @Input() playing: number;
  @Input() subtitle: Subtitle;
  subtitleForm: FormGroup;

  text = new FormControl('');

  constructor(private dbHttpService: DbHttpService, private mediaTimecode: MediaTimecodePipe, fb: FormBuilder) {
    this.subtitleForm = fb.group({
      text: this.text
    });
  }

  ngOnInit(): void {
  }

  seekTo(delta: number) {
    this.currentTime = this.currentTime + delta;
    // this.newCurrentTime.emit(this.currentTime);
  }

  editSubtitle(subtitle) {
    this.subtitle = subtitle;
    this.subtitleForm.patchValue({
      text: this.subtitle.text
    });
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
        id: this.subtitle.id,
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
        console.log('Added:');
        console.log(subtitle);
    });

  }

  updateSubtitle(subtitle: Subtitle): void {
    if (!subtitle) { return; }
    this.dbHttpService.updateSubtitle(subtitle)
      .subscribe(subtitle => {
        console.log('Updated:');
        console.log(subtitle);
      });
  }

  resetSubtitleForm() {
    delete this.subtitle;
  }
}
