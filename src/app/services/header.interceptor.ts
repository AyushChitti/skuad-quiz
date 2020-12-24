import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor( private router: Router) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const req = request.clone({
            headers: new HttpHeaders({
                'auth-token': '19c4ff12-e027-4320-b844-2cda768714e8',
                'content-type': 'application/json'
            })
        });

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                let err_msg = '';
                if (event instanceof HttpResponse) {
                    // console.log("Success = ", event)
                }
            }), catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    // console.log("Error = ", err);
                    if (err.status == 400) {
                        alert(err.message);
                    }
                    if (err.status == 401) {
                        alert(err.message);
                    }
                    if (err.status == 500) {
                        alert(err.message);
                    }
                    if (err.status == 0) {
                        alert(err.message);
                    }
                    if (err.status == 404) {
                        alert(err.message);
                    }
                }
                return of(err);
            })
        )
    }
}
