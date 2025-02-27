import { Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { TodosComponent } from './todos/todos.component';
import { NotesComponent } from './notes/notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { AddTodoComponent } from './add-todo/add-todo.component'; 
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { ManageBookmarksComponent } from './manage-bookmarks/manage-bookmarks.component';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';

// Define the routes
export const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'bookmarks/add', component: AddBookmarkComponent },
  { path: 'bookmarks/manage', component: ManageBookmarksComponent, children: [{ path: ':id', component: EditBookmarkComponent }]},
  { path: 'todos', component: TodosComponent },
  { path: 'todos/add', component: AddTodoComponent },
  { path: 'todos/:id', component: EditTodoComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/add', component: AddNoteComponent },
  { path: 'notes/:id', component: EditNoteComponent },
  { path: '', redirectTo: 'bookmarks', pathMatch: 'full' },
];

// Bootstrap the application with the AppComponent
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ],
});
