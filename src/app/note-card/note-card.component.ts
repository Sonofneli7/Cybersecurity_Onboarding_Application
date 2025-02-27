// app-note-card.component.ts
import { Component, Input } from '@angular/core';
import { Note } from '../shared/note.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule], // Removed NoteCardComponent from imports
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() note: Note | undefined; // Ensure this matches the type in NotesComponent
}
