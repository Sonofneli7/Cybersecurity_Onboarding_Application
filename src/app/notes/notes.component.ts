import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router'; // For routing
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NoteCardComponent } from '../note-card/note-card.component'; // Import NoteCardComponent
import { Subscription } from 'rxjs'; // Import Subscription to handle cleanup

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule, NoteCardComponent],  // Add NoteCardComponent here
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']  // Ensure this is correct
})
export class NotesComponent implements OnInit, OnDestroy {

  notes: Note[] = []; // Initialize notes as an empty array
  private notesSubscription: Subscription | undefined; // To hold the subscription for cleanup

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    // Subscribe to the notes observable from the NoteService
    this.notesSubscription = this.noteService.getNotesObservable().subscribe(notes => {
      this.notes = notes; // Update the notes array whenever it changes
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable when the component is destroyed to avoid memory leaks
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }

  // Handle adding a new note

handleAddNote() {
  const newNote = new Note('New Note', ['This is a new note.']); //Pass content as an array
  this.noteService.addNote(newNote); // Add the new note to the service
}

  // Handle editing an existing note
  handleEdit(note: Note) {
    this.noteService.updateNote(note.id, { content: ['Updated content'] }); // Update the note content
  }

  // Handle deleting a note
  handleDelete(noteId: string) {
    this.noteService.deleteNote(noteId); // Delete the note by its ID
  }
}
