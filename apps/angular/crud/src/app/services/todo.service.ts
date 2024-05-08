import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodo } from '../interfaces/ITodo';

interface ListState {
  isLoading: boolean;
  todoList: ITodo[]; // the list of Users
}

@Injectable()
export class TodoService {
  private stateSubject = new BehaviorSubject<ListState>({
    isLoading: false,
    todoList: [],
  });

  state$: Observable<ListState> = this.stateSubject.asObservable();

  constructor(private http: HttpClient) {
    this.stateSubject.next({ ...this.stateSubject.value, isLoading: true });

    this.http
      .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe(
        (todoListResponse: ITodo[]) => {
          this.stateSubject.next({
            isLoading: false,
            todoList: todoListResponse,
          });
        },
        () => {
          this.stateSubject.next({ isLoading: false, todoList: [] });
        },
      );
  }

  updateTodo(todoUpdated: ITodo) {
    this.stateSubject.next({ ...this.stateSubject.value, isLoading: true });

    todoUpdated = { ...todoUpdated, title: randText() };
    this.http
      .put<ITodo>(
        `https://jsonplaceholder.typicode.com/todos/${todoUpdated.id}`,
        todoUpdated,
      )
      .subscribe(
        (todoResponse: ITodo) => {
          const getState = this.stateSubject.value;
          getState.todoList = getState.todoList.map((todo) =>
            todo.id === todoResponse.id ? todoResponse : todo,
          );

          this.stateSubject.next({
            isLoading: false,
            todoList: getState.todoList,
          });
        },
        () => {
          this.stateSubject.next({ isLoading: false, todoList: [] });
        },
      );
  }

  deleteTodo(todoId: number) {
    this.stateSubject.next({ ...this.stateSubject.value, isLoading: true });

    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .subscribe(
        () => {
          const getState = this.stateSubject.value;
          getState.todoList = getState.todoList.filter(
            (item) => item.id !== todoId,
          );

          this.stateSubject.next({
            isLoading: false,
            todoList: getState.todoList,
          });
        },
        () => {
          this.stateSubject.next({ isLoading: false, todoList: [] });
        },
      );
  }
}
