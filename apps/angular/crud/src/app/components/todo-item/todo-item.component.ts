import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ITodo } from '../../interfaces/ITodo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todoItem: ITodo = {
    userId: 0,
    id: 0,
    title: '',
    body: '',
    completed: true,
  };

  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
}
