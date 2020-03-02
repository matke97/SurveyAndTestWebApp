import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';
import {UserService} from '../../Services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : User = new User();
  password2: String;
  constructor(private router: Router, private userService : UserService) { }
  imNotRobot = false;
  imgUpload;
  ngOnInit() {
  }

  tryRegister()
  {
    if(!this.imNotRobot)
    {
      alert('Check for im not robot');
      return;
    }
    if(!this.validateJMBG())
    {
      alert('JMBG not valid')!
      return;
    }
    if(this.user.password != this.password2)
    {
      alert('Lozinke se razlikuju');
      return;
    }

    this.userService.register(this.user)
    .pipe(first())
    .subscribe(
      data => 
      {
        alert('Vasa registracija ceka potvrdu administratora.');
        this.router.navigate(['']);
      },
      error =>
      {
        alert(error.error.error);
      }
    );
  }


  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    if(captchaResponse != null)
    {
      this.imNotRobot = true;
    }else{
      console.log('aaa');
      this.imNotRobot = false;
    }
  }

  uploadImage(files: FileList)
  {
    this.imgUpload = files.item(0);
  }

  validateJMBG()
  {
    
    if(this.user.jmbg != null && this.user.datum_rodj != null)
    {
      
      if(Number(this.user.jmbg.slice(0,2)) !== this.user.datum_rodj.getDate() || Number(this.user.jmbg.slice(2,4)) !== (this.user.datum_rodj.getMonth() +1)){
        return false;
      }
      var godina = Number(this.user.jmbg.slice(4,7));
      if(godina > 800)
      {
        godina += 1000;
      }else
      {
        godina +=2000;
      }
      if(godina !== this.user.datum_rodj.getFullYear())
      {
        return false;
      }
      let j : number[] = [];
      for(let i of this.user.jmbg)
      {
        j.push(Number(i));
      }
      let v = 11-((7*(j[0]+j[6])+
      6*(j[1]+j[7])+
      5*(j[2]+j[8])+
      4*(j[3]+j[9])+
      3*(j[4]+j[10])+
      2*(j[5]+j[11]))%11);
      console.log('V:', v, " J[12]:",j[12]);
      if(v !== j[12]) return false;
      
      return v === j[12];
      

    }
    return false;
  }

}
