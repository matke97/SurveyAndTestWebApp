import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,CanActivate,Router} from '@angular/router';
import { Observable } from 'rxjs';
import{UserService} from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PrikazGuard implements  CanActivate{
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.userService.isLoggedin())
    {
      if(this.userService.getCurrentUser().tip == 'kreator')
      {
        if(localStorage.getItem('AnketaPregled') != null)
        {
          return true;
        }
      }
    }
        alert('Unauthorized access');
        this.router.navigate(['']);
        return false;
  }
}
