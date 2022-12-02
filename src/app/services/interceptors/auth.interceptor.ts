import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { STORAGETOKENENUM } from 'src/app/models/enums';
import { SessionService } from '../../services/session/session.service';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    Authorization: any;
    token: any;
    constructor(
        private _Injector: Injector
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
            return next.handle(reqCloned);
        } else {
            return next.handle(req);
        }
    }
}

