import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ITodo } from '../interfaces/ITodo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(todoId: number) {
    return this.http.put<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      JSON.stringify({
        id: todoId,
        title: randText(),
      }),
    );
  }

  deleteTodo(todoId: number) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    );
  }
}
