import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { UiService } from '../common/ui.service';
import { AuthService, IAuthService, IAuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    protected authService: AuthService,
    private uiService: UiService,
    protected router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(childRoute);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin();
  }

  protected checkLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map((authStatus) => {
        const isOwner = this.checkIsOwner(authStatus, route);
        const authorize = authStatus.isAuthenticated && isOwner;
        if (!authorize) {
          this.showAlert(authStatus.isAuthenticated, isOwner);
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.getResolvedUrl(route),
            },
          });
        }
        return authorize;
      }),
      take(1) // the observable must complete for the guard to work
    );
  }

  private checkIsOwner(
    authStatus: IAuthStatus,
    route?: ActivatedRouteSnapshot
  ) {
    if (!route?.data?.['onlyOwner']) {
      return true;
    }
    return authStatus.userId === route.params['userId'];
  }

  private showAlert(isAuth: boolean, isOwner: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue');
    }
    if (!isOwner) {
      this.uiService.showToast(
        'Only the profile owner is allowed to perform this action'
      );
    }
  }

  getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) return '';
    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/');
  }
}
