import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-pass',
  templateUrl: './promena-pass.component.html',
  styleUrls: ['./promena-pass.component.css']
})
export class PromenaPassComponent implements OnInit {

  oldPass :string ='';
  newPass1:string = '';
  newPass2:string = '';
  idUser;
  constructor(private service: UserService, private router:Router) { }

  ngOnInit() {
    this.idUser = this.service.getCurrentUser()._id;
  }

  changePass()
  {
    if(this.newPass1 != this.newPass2)
    {
      alert('Uneti passwordi se razlikuju.');
      return;
    }
    this.service.changePassword(this.idUser, this.oldPass, this.newPass1)
    .subscribe(data => {
      if(data)
      {
        alert('Uspesno ste promenili sifru, morate se ponovo ulogovati');
        this.service.logOut();
        this.router.navigate(['']);
      }
    },
    error => {
      console.log(error.error);
      
      alert(error.error.error);
    });
  }

  chPass()
  {
    this.router.navigate([this.router.url + '/changePass']);
  }

}
