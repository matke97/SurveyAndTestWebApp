import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend'; 
  constructor(private router:Router, private service : UserService){}
  ngOnInit()
  {
    if(this.service.isLoggedin())
    {
      if(this.service.isAdmin())
      {
        this.router.navigate(['/admin']);
      }else
      {
        this.router.navigate(['/user/'+this.service.getCurrentUser().userName]);
      }
    }else
    {
      this.router.navigate(['/login']);
    }
  }
}
