import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Response } from '@angular/http';
  import { Observable, of, throwError } from 'rxjs';
  import { catchError, map, tap } from 'rxjs/operators';
  import { environment } from '../environments/environment';
  
  @Injectable()
  export class ApiService {
    constructor(private http: HttpClient) {}
  
    public get(
      path: string,
      params: HttpParams = new HttpParams()
    ): Observable<any> {
      return this.http
        .get(`${environment.apiUrl}${path}`, {
          headers: this.setHeaders(),
          params,
        })
        .pipe(
          map((res: Response) => res),
          catchError(this.formatErrors)
        );
    }
  
    public put(path: string, body: any = {}): Observable<any> {
      return this.http
        .put(`${environment.apiUrl}${path}`, JSON.stringify(body), {
          headers: this.setHeaders(),
        })
        .pipe(
          map((res: Response) => res.json()),
          catchError(this.formatErrors)
        );
    }
  
    public post(path: string, body: any = {}): Observable<any> {
      return this.http
        .post(`${environment.apiUrl}${path}`, JSON.stringify(body), {
          headers: this.setHeaders(),
        })
        .pipe(
          map((res: Response) => res),
          catchError(this.formatErrors)
        );
    }
  
    private setHeaders(): HttpHeaders {
     /*  const headersConfig = {
        'Content-Type': 'application/json',
        //'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Access-Control-Allow-Credentials': 'true'
      }; */
      const headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        //'Accept-Encoding': 'gzip, deflate, br',
        //'Accept-Language': 'en-US,en;q=0.9',
        //'Sec-Fetch-Mode': 'navigate',
        //'Sec-Fetch-Site': 'none'
        //'Access-Control-Allow-Methods': '*',//'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        //'Access-Control-Allow-Headers': '*',//'X-Requested-With,content-type',
        //'Access-Control-Allow-Credentials': 'true'
      };
      
  

      return new HttpHeaders(headersConfig);
    }
  
    private formatErrors(error: HttpErrorResponse) {
      let errorMessage = 'An error occurred: ' + error.message;
      if (error.error && error.error instanceof ErrorEvent) {
        errorMessage = `${error.error.message}`;
      } else if (error.error && error.error instanceof Object) {
        errorMessage = `${error.error.message}`;
      }
      return throwError(errorMessage);
    }
  }
  