import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from  'rxjs/operators';
import {UserService } from '../../Services/user.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName : string;
  password : string;

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit() {
  }

  tryLogin()
  {
    this.userService.login(this.userName, this.password)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data.tip);
        if(data.tip == 'ispitanik' || data.tip == null){
         this.router.navigate(['/user/'+this.userName]);
        }
        if(data.tip == 'admin')
        {
          this.router.navigate(['/admin']);
        }
        else if(data.tip == 'kreator')
        {
          this.router.navigate(['/user/'+this.userName]);
        }
      },
      error => {
        console.log(error.error);
        
        alert(error.error.error);
      });
  }

}
