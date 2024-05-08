import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ITodo } from '../../interfaces/ITodo';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, MatProgressSpinnerModule],
  templateUrl: './todo.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoService],
})
export class TodoComponent {
  state$ = this.todoService.state$;

  constructor(private todoService: TodoService) {}

  update(todo: ITodo) {
    this.todoService.updateTodo(todo);
  }
  delete(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }
}
