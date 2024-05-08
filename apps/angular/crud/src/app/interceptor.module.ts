import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authReq = httpRequest.clone({
      headers: httpRequest.headers.set(
        'Content-Type',
        'application/json; charset=UTF-8',
      ),
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        switch (error.status) {
          case 404:
            alert('Resource is not found');
            return throwError(() => new Error('Resource is not found'));
          case 401:
            alert('Unauthorized');
            return throwError(() => new Error('Unauthorized'));
          case 403:
            alert('Forbidden');
            return throwError(() => new Error('Forbidden'));
          default:
            alert('Something wrong happened');
            return throwError(() => new Error('Something wrong happened'));
        }
      }),
    );
  }
}
