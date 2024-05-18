import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';
import { TodoService } from './services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, TodoComponent],
  selector: 'app-root',
  template: `
    <app-todo></app-todo>
  `,
  styles: [],
  providers: [TodoService],
})
export class AppComponent {}
