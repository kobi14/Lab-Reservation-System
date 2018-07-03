import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  adminIn() {

    if (this.authService.isAdmin()) {
      return true;
    }


  }




}
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    console.log('OnlyLoggedInUsers');
    if (this.authService.isAdmin()) {
      return true;
    } else {
      window.alert('You do not have permission to view this page');
      this.router.navigate(['/']);
      return false;
    }
  }
}

@Injectable()
export class RoleGuardService2 implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    console.log('OnlyLoggedInUsers');
    if (!this.authService.isAdmin()) {
      return true;
    } else {
      window.alert('You do not have permission to view this page');
      this.router.navigate(['/']);
      return false;
    }
  }
}

