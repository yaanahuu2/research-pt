import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DbHttpService } from '../../services/db-http.service';
import { StripHtmlPipe } from '../../pipes/strip-html.pipe';
import { ZoteroItemNotes } from './zotero-item-notes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css', '../zotero/zotero-dialog-cont/zotero-dialog-cont.component.css']
})
export class NotesComponent implements OnInit {

  console = console;

  @Input() formType: string;
  @Input() key: string;
  @Input() childItems: any;

  isNoteFormActive: boolean = false;
  noteForm: FormGroup;

  videoIn = new FormControl('');
  videoOut = new FormControl('');
  pageNum = new FormControl('');
  noteText = new FormControl('');
  floatLabelControl = new FormControl('auto');

  notes: ZoteroItemNotes[];
  note: ZoteroItemNotes;

  constructor(private dbHttpService: DbHttpService, fb: FormBuilder, private stripHtml: StripHtmlPipe) {
    this.noteForm = fb.group({
      floatLabel: this.floatLabelControl,
      videoIn: this.videoIn,
      videoOut: this.videoOut,
      pageNum: this.pageNum,
      noteText: this.noteText
    });
  }

  ngOnInit(): void {
    this.getNotes(this.key);
  }

  getNotes(key: string): void {
    this.dbHttpService.getNotes(key)
    .subscribe(notes => this.notes = notes);
  }

  editNote(note) {
    this.note = note;
    this.toggleNoteForm();

    this.noteForm.patchValue({
      pageNum: this.note.pageNum,
      noteText: this.note.noteText
    });

  }

  importZoteroNote(zotero_note) {
    let noteText = this.stripHtml.transform(zotero_note.data.note, 'outer');
    let a = /(Page:|Page.|P:|P.) \d+/ig;
    let b = /\d+/;
    let c = /<p>(Page:|P:) \d+<\/p>/g;

    if (noteText.search(a) > -1) {

      var pageNum = noteText.match(b)[0];
      noteText = noteText.replace(c, '');
      console.log(pageNum);
      console.log(noteText);
    }

    var note: ZoteroItemNotes = {
      id: null,
      key: zotero_note.key,
      pageNum: (pageNum) ? pageNum : null,
      noteText: noteText
    }
    console.log(note);
    this.add(note, true);
  }

  onSubmit() {
    if (this.note) {
      var note: ZoteroItemNotes = {
        id: this.note.id,
        key: this.note.key,
        pageNum: this.noteForm.value.pageNum,
        noteText: this.noteForm.value.noteText
      }
      console.log(note);
      this.updateNote(note);
    }
    else {
      var note: ZoteroItemNotes = {
        id: null,
        key: this.key,
        pageNum: this.noteForm.value.pageNum,
        noteText: this.noteForm.value.noteText
      }
      console.log(note);
      this.add(note, false);
    }

    this.toggleNoteForm();
  }

  add(note: ZoteroItemNotes, zotero_import: boolean): void {

    if (!note) { return; }
    this.dbHttpService.addNote(note as ZoteroItemNotes)
      .subscribe(note => {
        this.notes.push(note);
        if (zotero_import) {
          this.childItems = this.childItems.filter(function( obj ) {
              return obj.key !== note.key;
          });
        }
    });

  }

  updateNote(note: ZoteroItemNotes): void {

    if (!note) { return; }
    this.dbHttpService.updateNote(note)
      .subscribe(() => this.getNotes(note.key));
  }

  toggleNoteForm() {
      this.isNoteFormActive = !this.isNoteFormActive;
  }

  resetNoteForm() {
    delete this.note;
  }
}
