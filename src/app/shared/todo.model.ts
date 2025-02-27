import { v4 as uuidv4 } from 'uuid';

export class Todo {
  id: string;
  completed: boolean;
  noteId?: string; // Optional reference to the note
  text: string; // The required 'text' property

  constructor(text: string) { // Pass only 'text' to the constructor
    this.text = text || 'Default todo text';  // Set default text if none is provided
    this.id = uuidv4();  // Generate a unique ID
    this.completed = false;  // Set default to incomplete
    this.noteId = '';  // Initialize noteId with an empty string (or some default value)
  }
}

