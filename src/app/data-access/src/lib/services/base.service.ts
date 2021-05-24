import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public xsrf: Observable<string>;
  public xsrfToken: String;
  defaultOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {
    // Get xsrf token.
  }

  // tslint:disable-next-line: no-any
  get(url: string): Observable<any> {
    return this.getUnsafe(url).pipe();
  }

  // tslint:disable-next-line: no-any
  getUnsafe(url: string): Observable<any> {
    return this.http
      .get(url, {
        withCredentials: true,
        headers: {
          xsrf: this.xsrfToken ? this.xsrfToken.toString() : '',
        },
        observe:
          url.indexOf('new/predashboard') > 0
            ? ('response' as 'body')
            : ('body' as 'body'),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          // this.logger.log(this.createLoggerErrorMessage(err));
          return throwError(err);
        })
      );
  }

  // tslint:disable-next-line: no-any
  post(url: string, payload: any): Observable<any> {
    return this.http
      .post(url, payload, {
        withCredentials: true,
        observe: 'response',
        headers: {
          xsrf: this.xsrfToken ? this.xsrfToken.toString() : '',
        },
        responseType: 'json',
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          // this.logger.log(this.createLoggerErrorMessage(err));
          return throwError(err);
        })
      );
  }
  // tslint:disable-next-line: no-any
  put(url: string, payload: any): Observable<any> {
    return this.http
      .put(url, payload, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          // this.logger.log(this.createLoggerErrorMessage(err));
          return throwError(err);
        })
      );
  }
  // tslint:disable-next-line: no-any
  delete(url: string, payload?: any): Observable<any> {
    const options = {
      body: payload,
      headers: new HttpHeaders({
        xsrf: this.xsrfToken ? this.xsrfToken.toString() : '',
        'Content-Type': 'application/json',
      }),
      responseType: 'blob',
      observe: 'response',
    };
    return this.http
      .request('delete', url, {
        body: payload,
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          // this.logger.log(this.createLoggerErrorMessage(err));
          return throwError(err);
        })
      );
  }

  createLoggerErrorMessage(err: HttpErrorResponse): string {
    return 'ERROR: ' + err.message;
  }
}
