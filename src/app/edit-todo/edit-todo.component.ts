import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  // Import FormsModule
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],  // Ensure FormsModule is imported here
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {

  todo: Todo | undefined;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    // Fetch the todo ID from the URL parameters
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id');
      if (todoId) {
        // Get the existing todo from the TodoService using the id
        this.todo = this.todoService.getTodo(todoId);
        if (!this.todo) {
          console.error(`Todo with id ${todoId} not found`);
          this.router.navigate(['/todos']);
        }
      } else {
        console.error('Todo ID is missing');
        this.router.navigate(['/todos']);
      }
    });
  }

  onFormSubmit(form: NgForm): void {
    if (form.invalid) return;  // Prevent if form is invalid
  
    if (this.todo) {
      const todoId = this.todo.id;
      if (todoId) {
        const updatedTodo = { 
          title: form.value.title,  // Make sure you are using form values for updating the todo
          completed: form.value.completed
        };
  
        // Update the todo in the service
        this.todoService.updateTodo(todoId, updatedTodo);
  
        // Navigate back to the todos list after updating
        this.router.navigateByUrl('/todos');
      } else {
        console.error('Todo ID is missing during the update');
      }
    }
  }  
}

// shortcut to generate service: ng g s <insert service name>