import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  get(url:any, param: any) {
    return this.http.get(url, {
      params: param
    }).pipe(catchError(this.handleError))
  }

  post(url:any, data:any, param: any) {
    return this.http.post(url, data, {
      params: param
    }).pipe(catchError(this.handleError))
  }

  patch(url:any, data:any, param: any) {
    return this.http.patch(url, data, {
      params: param
    }).pipe(catchError(this.handleError))
  }

  delete(url:any, param: any) {
    return this.http.delete(url, {
      params: param
    }).pipe(catchError(this.handleError))
  }
}
