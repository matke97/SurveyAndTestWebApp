import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IspitivanjeGuard implements   CanActivate{
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
  {
   
    if (this.userService.isLoggedin()) 
    {
      if(localStorage.getItem('idAnk') == null)
      {
        alert('Unauthorized access');
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } 
    else 
    {
      alert('Unauthorized access');
        this.router.navigate(['/']);
        return false;
    }
    }
  }