import { Injectable } from '@angular/core';

import { HttpClient,HttpParams,HttpHeaders,HttpResponse,HttpErrorResponse } from '@angular/common/http';

import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

   todoUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  /**
   * list all todo 
   * @return {Observable<Todo[]>}
   */
  getAllToDos():Observable<Todo[]>{

  	return this.http
    .get<Todo[]>(this.todoUrl + '/todos')
    .pipe(catchError(this.handleError));

  }
  /**
   * Create new todo
   * @param  {Todo}             newTodo
   * @return {Observable<Todo>}
   */
  createTodo(newTodo:Todo):Observable<Todo>{
    return this.http.post<Todo>(
      this.todoUrl+'/todos',newTodo
      ).pipe(
      catchError(this.handleError)
      );
  }
  /**
   * Delete todo based on id
   * @param  {number}     todoId
   * @return {Observable}
   */
  deleteTodo(todoId: number):Observable<{}>{
    return this.http.delete(this.todoUrl+'/todos/'+todoId)
    .pipe(catchError(this.handleError));

  }
  /**
   * Update todo
   * @param  {Todo}             todo 
   * @return {Observable<Todo>}
   */
  updateTodo(todo:Todo):Observable<Todo>{
    return this.http.put<Todo>(this.todoUrl+'/todos/'+todo.id,todo)
    .pipe(catchError(this.handleError));
  }
  /**
   * Handle error
   * @param {HttpErrorResponse} error
   */
  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};
}
