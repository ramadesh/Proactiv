import { Component } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent {
  noteText = '';

  constructor(private noteService: NoteService) { }
  
  ngOnInit(): void {
    this.getNote();
  }

  getNote() {
    this.noteService.getNote().subscribe((note) => {
      this.noteText = note;
    })
  }

  saveNote() {
    this.noteService.updateNote(this.noteText).subscribe((success) => {
      if(success) {
        console.log('Note updated sucessfully');
        alert("Notes successfully saved.");
      } else {
        console.log('Failed to update note');
        alert("Failed to save notes.");
      }
    })
  }
}
