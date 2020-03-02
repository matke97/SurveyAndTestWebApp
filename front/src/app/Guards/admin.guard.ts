import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../Services/user.service';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
  {

    //return true;
    if(this.userService.isLoggedin())
    {
      
      if(this.userService.isAdmin())
      {
        return true;
      }
      else
      {
        alert('Unauthorized access');
        this.router.navigate(['/']);
        return false;
      }
    }else
    {
      alert('Unauthorized access');
        this.router.navigate(['/']);
      return false;
    }
  }
  
}
