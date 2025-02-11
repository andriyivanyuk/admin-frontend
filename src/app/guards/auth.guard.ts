import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenService.getToken();
    const isAuthPage = state.url.includes('auth');

    if (isAuthPage && token) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    } else if (!isAuthPage && !token) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
