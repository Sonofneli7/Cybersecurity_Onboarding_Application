import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule, TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  private todosSubscription: Subscription | null = null;  // Initialize to null

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the observable to get todos from the service
    this.todosSubscription = this.todoService.getTodosObservable().subscribe((todos) => {
      this.todos = todos;
      console.log('Todos received in component:', this.todos);  // Log todos to check if data is populated correctly
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }

  // Handler for edit action
  handleEdit(todo: Todo): void {
    console.log('Edit clicked for:', todo);
    if (todo.id) {
      this.router.navigate(['/todos', todo.id]); // Navigate to the edit page
    }
  }

  // Refresh todos in case of changes
  refreshTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  // Handler for delete action
  handleDelete(todoId: string): void {
    this.todoService.deleteTodo(todoId); // Delete from service
    this.todos = this.todos.filter(todo => todo.id !== todoId); // Remove from UI
  }

  // Handler for toggling completion status
  handleToggleCompletion(todoId: string): void {
    const todo = this.todos.find(t => t.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
      this.todoService.updateTodo(todo.id, todo); // Update todo status in the service
    }
  }
}
