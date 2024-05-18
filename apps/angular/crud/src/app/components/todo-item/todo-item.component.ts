import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RxState } from '@rx-angular/state';
import { RxIf } from '@rx-angular/template/if';
import { RxLet } from '@rx-angular/template/let';
import { merge } from 'rxjs';
import { ITodo, WithError } from '../../interfaces/ITodo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RxLet, RxIf],
  templateUrl: './todo-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent extends RxState<{
  loading: boolean;
  todo: WithError<ITodo>;
}> {
  @Input() set todo(todo: ITodo) {
    this.set({ todo, loading: false });
  }

  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  vm$ = this.select();

  constructor() {
    super();
    this.connect(
      'loading',
      merge(this.updateEvent, this.deleteEvent),
      () => true,
    );
  }
}
