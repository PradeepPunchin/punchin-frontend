import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { STORAGETOKENENUM } from 'src/app/models/enums';
import { SessionService } from '../../services/session/session.service';
import { NotifierService } from '../notifier/notifier.service';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    Authorization: any;
    token: any;
    constructor(
        private _Injector: Injector,
        private NotifierService: NotifierService,
        private Router: Router,
        private SessionService: SessionService
    ) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const _SessionService = this._Injector.get(SessionService);
        const token = _SessionService.getSession(STORAGETOKENENUM.token);
        if (token != null) {
            const reqCloned = req.clone({
                setHeaders: {
                    "X-Xsrf-Token": `${token || ''}`,
                    AcceptLanguage: 'en'
                }
            });
            return next.handle(reqCloned).pipe(
                catchError((err: HttpErrorResponse) => {
                    if(err && err.status === 401) {
                      this.NotifierService.showError('Token Expired. Please login again')
                      this.SessionService.removeSessions();
                      this.Router.navigate(['/']);
                    }
                    return throwError(err);
                  })
            );
        } else {
            return next.handle(req);
        }
    }
}

