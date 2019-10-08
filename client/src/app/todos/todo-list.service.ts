import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Todo} from './todo';
import {environment} from '../../environments/environment';

@Injectable()
export class TodoListService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {

    return this.httpClient.get<Todo[]>(this.todoUrl);
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], searchOwner?: string, searchStatus?: string, searchBody?: string): Todo[] {

    let filteredTodos = todos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by status
    if (searchStatus != null) {
      searchStatus = searchStatus.toLowerCase();
      if (searchStatus == "complete") {
        filteredTodos = filteredTodos.filter((todo: Todo) => {
          return todo.status;
        });
      } else if (searchStatus == "incomplete") {
        filteredTodos = filteredTodos.filter((todo: Todo) => {
          return !todo.status;
        });
      }
    }

    //Filter by body
    if (searchBody != null) {
      searchBody = searchBody.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => {
        return todo.body.toLowerCase().indexOf(searchBody) !== -1;
      });
    }

    return filteredTodos;
  }
}
