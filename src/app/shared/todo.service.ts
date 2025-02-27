import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { BehaviorSubject, Subscription } from 'rxjs';  // Import BehaviorSubject
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  todos: Todo[] = [];
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]); // Initialize BehaviorSubject
  storageListenSub: Subscription;
 
  // Add initialTodos directly here
  initialTodos: Todo[] = [
    new Todo('Building & Elevator Access with ID credentials: Contact: Building Manager'),
    new Todo('Facility Tour with Mentor or Manager: Important Areas of Interest'),
    new Todo('Introductions: Fellow Team Members'),
    new Todo('Laptop Retrieval'),
    new Todo('Computer Log-on: 1st Time-  Setup Username & Password'),
    new Todo('Find Computer Name for future reference.'),
    new Todo('Make sure basic Microsoft Office pre-installed.'),
    new Todo('Install Microsoft Teams: Internal Communication Messaging Application'),
    new Todo('Set up Outlook & Corporate email account'),
    new Todo('Request and Enroll in identity and access management (IAM) systems for Computer Privileges'),
    new Todo('Request Corporate VPN: required for remote working'),
    new Todo('Review company’s cybersecurity policies (acceptable use, data protection, incident response)'), 
    new Todo('Complete compliance training (ISO 27001, NIST, GDPR, SOC 2)'),
    new Todo('Understand legal and regulatory requirements related to the company’s industry.'),
    new Todo('Review cybersecurity framework used (NIST, CIS Controls, MITRE ATT&CK)'),
    new Todo('Familiarize with audit and compliance processes (who manages them and how they are enforced)'),
    new Todo('Install AWS MyID'),
    new Todo('Install AWS Command Line Interface'),
    new Todo('Install Docker'),
    new Todo('Install Splunk'),
    new Todo('Review Incident Response Plan '),
    new Todo('Participate in a tabletop exercise or red team/blue team drill.'),
    new Todo('Learn about forensic investigation tools (Autopsy, FTK, Wireshark)'),
    new Todo('Create Request for Github'),
    new Todo('Install Git'),
    new Todo('Understand CI/CD security measures (Jenkins)'),
    new Todo('Create Request for Google Drive'),
    new Todo(''),
    new Todo('Download SonarQube: Another Testing tool for Business Apps: View Notes'),
    new Todo('Familiarize with SAST/DAST tools'),
    new Todo('Request for Database Access'),
    new Todo('Learn about infrastructure as code (IaC) security (Terraform, AWS IAM policies)'),
    new Todo('Download SoapUI: similar to Postman for testing Request and Response')
   
  ];

  constructor() {
    this.loadState(); // Load todos from local storage on initialization
    this.todosSubject.next(this.todos); // Emit the current state of todos

    // Listen for 'storage' events and reload state if the 'todos' key changes
    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter((event) => event.key === 'todos'), // Only process events for the 'todos' key
        debounceTime(100) // Add debounce to reduce excessive processing
      )
      .subscribe(() => {
        this.loadState(); // Re-sync todos with the updated local storage data
        this.todosSubject.next(this.todos); // Emit updated state
      });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: string): Todo | undefined {
    return this.todos.find((t) => t.id === id);
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.saveState();
    this.todosSubject.next(this.todos); // Emit the updated todos list
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>): void {
    const todo = this.getTodo(id);
    if (todo) {
      Object.assign(todo, updatedTodoFields);
      this.saveState(); // Save updated todo list to localStorage
      this.todosSubject.next(this.todos); // Emit the updated todos list
    } else {
      console.warn(`Todo with id ${id} not found.`);
    }
  }
  

  deleteTodo(id: string): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1); // Remove the todo from the array
      this.saveState(); // Save state after deletion
      this.todosSubject.next(this.todos); // Emit the updated todos list
    } else {
      console.warn(`Todo with id ${id} not found.`);
    }
  }

  saveState(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos)); // Save todos to local storage
  }

 loadState(): void {
  try {
    const todosInStorage = JSON.parse(localStorage.getItem('todos') ?? '[]');
    console.log('Loaded from localStorage:', todosInStorage);

    if (Array.isArray(todosInStorage) && todosInStorage.length > 0) {
      this.todos = todosInStorage;  // Use the data from localStorage if available
      console.log('Using todos from localStorage:', this.todos);
    } else {
      console.warn('No todos found in localStorage, using initial todos.');
      this.todos = this.initialTodos;  // Use the prepopulated data
      this.saveState();  // Store this data in localStorage
      console.log('Using initial todos:', this.todos);
    }

    this.todosSubject.next(this.todos);  // Emit the current state of todos

  } catch (e) {
    console.error('Failed to load todos from localStorage:', e);
    this.todos = this.initialTodos;  // Fallback to initialTodos in case of error
    this.todosSubject.next(this.todos);
  }
}

  
  

  // Expose the observable for components to subscribe to
  getTodosObservable() {
    return this.todosSubject.asObservable();
  }
}
