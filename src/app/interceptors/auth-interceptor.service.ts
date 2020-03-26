import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // if(localStorage.getItem('jwt')){
    //   let reqClone = req.clone({
    //     headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
    //   })
    //   return next.handle(reqClone).pipe(
    //     catchError(err => {
    //       if(err.status == 401){

    //       }
    //       return throwError(err);
    //     })
    //   );
    // }
    // else{
    //   next.handle(req.clone());
    // }

    console.log('auth-interceptor invoked!')

    return next.handle(req);
  }
}
