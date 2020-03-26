import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

    return next.handle(req).pipe(
      catchError(
        (error, caught) =>{                   
          if(error.status == 401){
            localStorage.removeItem('jwt');           
            return of(error);
          }
          throw error;
        }
      )
    )
  }
}
