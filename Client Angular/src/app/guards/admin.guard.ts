import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate { 
    constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.authService.isAdmin()) { 
      return true;
    } else {
      window.alert("You don't have permission to view this page"); 
      return false;
    }
  }
}
