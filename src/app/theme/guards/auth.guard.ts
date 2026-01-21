import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorisationService } from '../../theme/services/authorisation.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../theme/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router
    , private authservice: AuthorisationService
    , private alertService: AlertService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
        return true;//return this.authservice.checkAuthorisation(state.url);
    }
          // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']/* , { queryParams: { returnUrl: state.url }} */);
    return false;
  }
}
