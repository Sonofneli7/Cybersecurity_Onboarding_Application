import { v4 as uuidv4 } from 'uuid';

export class Note {
  id: string;
  title: string;
  content: string[]; // Always an array
  createdAt: Date;

  constructor(title: string, content: string[]) { 
    this.id = uuidv4();
    this.title = title || 'Untitled';
    this.content = content; 
    this.createdAt = new Date();
  }
}
