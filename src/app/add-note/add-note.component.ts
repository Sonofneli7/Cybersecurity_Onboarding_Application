import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { CommonModule } from '@angular/common'; // Ensure CommonModule is imported

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule], // Ensure both FormsModule and CommonModule are imported
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {

showValidationErrors: boolean | undefined;
  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm) {
    this.showValidationErrors = !!form.invalid; // Ensures showValidationErrors is always a boolean
    if (form.invalid){
      this.showValidationErrors = true;
      return;
    }
  
    const note = new Note(form.value.title, form.value.content);
    this.noteService.addNote(note);
    this.router.navigateByUrl("/notes");
  }
}
