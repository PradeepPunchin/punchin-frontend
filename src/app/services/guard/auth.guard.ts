import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { STORAGETOKENENUM } from 'src/app/models/enums';
import { AuthService } from '../auth/auth.service';
import { NotifierService } from '../notifier/notifier.service';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private sessionServive: SessionService

  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token: any = this.sessionServive.getSession(STORAGETOKENENUM.token);
    if (token) {
      return true
    } else {
      this.router.navigate(['/'])
      this.notifierService.showError('UnAuthorized Access')
      return false
    }
  }
}
