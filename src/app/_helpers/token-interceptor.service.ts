import { AuthService } from 'src/app/api/auth/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 403) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(error);
                }
            })
        );
    }



    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.auth.renewToken().pipe(
                switchMap(res => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(res.data.newAccessToken);
                    return next.handle(this.addToken(request, res.data.newAccessToken));
                })
            );

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        }
    }

    addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                accessToken: token
            }
        });
    }
}
