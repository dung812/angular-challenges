import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RxActionFactory } from '@rx-angular/state/actions';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { ITodo } from '../../interfaces/ITodo';
import { TodosStateService } from '../../store/todo.state';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, RxFor, RxLet],
  templateUrl: './todo.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodosStateService, RxActionFactory],
})
export class TodoComponent {
  readonly todosState = inject(TodosStateService);
  readonly vm$ = this.todosState.vm$;

  trackById(index: number, todo: ITodo) {
    return todo.id;
  }
}
