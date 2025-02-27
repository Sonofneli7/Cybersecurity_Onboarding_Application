import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {

  showValidationErrors: boolean | undefined;
  
  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm): void {  // Update return type to void
    if (form.invalid) {
      this.showValidationErrors = true;
      return;  // Early exit on invalid form, no need to return anything
    }
    const todo = new Todo(form.value.text);
    this.todoService.addTodo(todo);
    this.router.navigateByUrl('/todos');
  }
}
