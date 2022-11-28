import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotifierService } from '../notifier/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      if(this.authService.isAuthenticated()) {
        return true;
      } else {
        this.notifierService.showError('Unauthorized Access')
        this.router.navigate(['/']);
        return false;
      }
  }
  
}
