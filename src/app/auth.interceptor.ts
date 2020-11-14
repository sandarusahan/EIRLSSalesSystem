import { Router } from '@angular/router';
import { AuthenticateService } from './Services/authenticate.service';
import { HttpErrorResponse, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService:AuthenticateService, private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.authService.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq).pipe(
      tap((event:HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          
        }
      }, (err: any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 403) {
            this.router.navigate(['login']);
          }
        }
      })
    );
  }


}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];