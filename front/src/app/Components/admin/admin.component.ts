import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import {User} from '../../Models/user';
import { first } from 'rxjs/operators';

import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userServ : UserService) { }
  //users : Array<User>;
  selectedUser : User;
  selItems : SelectItem[]      = new Array<SelectItem>();
  selRegistred : SelectItem[] = new Array<SelectItem>();
  selectedRegistred : User;
  ngOnInit() {
    this.getReg();
    this.getRegistorvane();

  }

  getReg()
  {
    
  
    this.userServ.getRegistraicjeNaCekanju()
    .pipe(first())
    .subscribe(
      data => 
      {
        if(data) 
      {
        for(let i = 0; i < data.length; i++ )
        {
          let u = new User();
          u.ime = data[i].ime; 
          u.userName = data[i].userName;
          u.email = data[i].email;
          u = data[i];
          this.selItems.push({label : data[i].ime, value :u});
        
        }
      }
      }
    );
  }
  
  getRegistorvane()
  {
    this.userServ.getRegistrovane()
    .pipe(first())
    .subscribe(
      data => 
      {
        if(data) 
      {
        
        for(let i = 0; i < data.length; i++ )
        {
          let u = new User();
         /* u.ime = data[i].ime; 
          u.userName = data[i].userName;
          u.email = data[i].email;*/
          u = data[i];
          this.selRegistred.push({label : data[i].ime, value :u});
        
        }
      }
      }
    );
  }

  registruj(event)
  {
    var tip = 
    {
      userName : this.selectedUser.userName,
      tip : this.selectedUser.tip
    };
    this.userServ.approveRegistration(tip)
    .pipe(first())
    .subscribe(
      data => 
      {
        if(data)
        {
          this.selItems = [];
          this.selRegistred = [];
          this.selectedUser = null;
          this.getReg();
          this.getRegistorvane();
        }
      }
    )
  }


  odbijReg(event)
  {
   
    this.userServ.disapproveRegistration(this.selectedUser.userName)
    .pipe(first())
    .subscribe(data => 
      {
        if(data)
        {
          console.log(data);
          this.selItems = [];
          this.selectedUser = null;
          this.getReg();
          //this.getRegistorvane();
        }
      });
  }

  izbrisi(event)
  {
    console.log(this.selectedRegistred.userName);
    this.userServ.deleteUser(this.selectedRegistred.userName)
    .pipe(first())
      .subscribe( data =>{
        if(data)
        {
          console.log(data);
          this.selRegistred = [];
          this.selectedRegistred = null;
          this.getRegistorvane();
        }
      });
    
  }

  logOut()
  {
    this.userServ.logOut();
  }
}
