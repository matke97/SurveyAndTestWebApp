import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../Services/user.service';
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements  CanActivate{
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    if (this.userService.isLoggedin()) 
    {
      const username = route.paramMap.get('username');
          if (username == this.userService.getCurrentUser().userName) {
              return true;
          } else {
            alert('Unauthorized access');
            this.router.navigate(['/']);
            return false;
          }
    } 
    else 
    {
      alert('Unauthorized access');
        this.router.navigate(['/']);
        return false;
    }
  }
 
}
