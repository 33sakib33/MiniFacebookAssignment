import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService : UserService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
      if(!this.userService.isLoggedIn()){
        
        this.router.navigate(['signin']);
        // this.router.navigateByUrl('login');
        this.userService.deleteToken();
        return false;
      }
    return true;
  }
  
}
