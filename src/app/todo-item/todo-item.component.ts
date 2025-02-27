import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo?: Todo; // Input property to accept a todo object

  @Output() editClick: EventEmitter<Todo> = new EventEmitter();
  @Output() deleteClick: EventEmitter<string> = new EventEmitter();
  @Output() toggleCompletion: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEditClick() {
    this.editClick.emit(this.todo);
  }

  onDeleteClick() {
    if (this.todo?.id) {
      this.deleteClick.emit(this.todo.id);
    }
  }

  onToggleCompletion() {
    if (this.todo?.id) {
      this.toggleCompletion.emit(this.todo.id);
    }
  }
}
