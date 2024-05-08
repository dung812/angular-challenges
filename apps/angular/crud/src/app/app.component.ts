import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  standalone: true,
  imports: [CommonModule, TodoComponent],
  selector: 'app-root',
  template: `
    <app-todo></app-todo>
  `,
  styles: [],
  providers: [],
})
export class AppComponent {}
