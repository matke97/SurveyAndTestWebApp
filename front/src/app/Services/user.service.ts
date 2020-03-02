import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { parse } from 'url';
//LOGIN JE ZNAK PITANJA, treba da se uradi za supervizora i admina i jos neke stvari

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService
 {

  server : string = "http://localhost:8000/";
  constructor(private http: HttpClient, private router: Router) { }

  /*********************
   * @brief Function sends http post request to server in order to provide login of user 
   * @param userName userName of user that want to login
   * @param pass user password that want to login
   * @returns User object
   *******************/
  login(userName:string, pass: String){
    let a= 
    {
      userName : userName,
      password : pass
    }
    
    console.log(a);
    return this.http.post<any>(this.server + 'user/login',a).pipe
    (map(user => {
      console.log(user);
      if(user) 
      {
        console.log('aaaa');
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }
      return null;
    }));
    
    
  }

  /*********************
   * @brief Function sends http post request to server with required data for registration of new user
   * @param params User object with data
   * @returns Ok or error msg
   *******************/
  register(params: User)
  {
    console.log(params);
    return this.http.post<any>(this.server + 'user/register', params).pipe
    (map(poruka => 
      {
        if(poruka)
        {
          
          return poruka;
        }
        return null;
      }));
 
  }

  /*********************
   * 
   * @brief Function sends http get request to server in order to get all registered user
   * @returns  Observable<any> -> array of all regitred users(userName, name, email)
   * 
  *******************/
  getRegistrovane()
  {
    return this.http.get<any>(this.server + 'user/registredUsers');
    
  }

  /*********************
   * 
   * @brief Function sends http get request to server to get all pending registrations
   * @returns  Observable<any> -> array of all accounts that needs confirmation
   * 
  *******************/
  getRegistraicjeNaCekanju()
  {
    return this.http.get<any>(this.server + 'user/naCekanju').pipe
    (map(reg =>
      {
        if(reg){
          return reg;
        }
      }));
  }

  /***************
   * @brief Function sends http post req that provides approving of registration
   * @param user - JSON object with info about account and type of user(creator/examinee)
   * @returns Observable<any> -> Is operation successfully or not
   **************/
  approveRegistration(user)
  {
    return this.http.post<any>(this.server + 'user/approve', user);
  }

  /***************
   * @brief Function sends http post req that provides approving of registration
   * @param user - userName of account
   * @returns Observable<any> -> Is operation successfully or not
   **************/
  disapproveRegistration(userN)
  {
    var a = {
      "userName" : userN
    };
    return this.http.post<any>(this.server + 'user/Disapprove', a).pipe
    ( map(reg =>
      {
        if(reg)
        {
          return reg;
        }
      }));
  }
  

  /**
   * @brief Fuction to check is some account loged or not
   * @returns True if some user is loggedIn, false if not
   */
  isLoggedin()
  {
    var usr = localStorage.getItem('currentUser');

   if(usr == null)
   {
     return false;
   } 
   else
   {
     return true;
   }
  }
 
  
  isAdmin()
  {
    if(!localStorage.getItem('currentUser'))
    {
      
      return false;
    }
    
    var usr = JSON.parse(localStorage.getItem('currentUser'));
    if(usr.tip != 'admin')
    {
      return false;
    }
    return true;
  }
  
  
  isUser()
  {
    if(!this.isLoggedin)
    {
      return false;
    }
    var usr = JSON.parse(localStorage.getItem('currentUser'));
    if(usr.tip != 'anketar' || usr.tip != 'kreator')
    {
      return false;
    }
    return true;
  }

  getCurrentUser()
  {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * 
   * @param userName userName of account to be deleted from application
   * @returns Observable object- is operatcion successfully
   */
  deleteUser(userName)
  {
    var a = 
    {
      "userName" : userName
    };
    return this.http.post<any>(this.server + 'user/deleteUser', a);
  }

  /**
   * @brief Logout current user
   */
  logOut()
  {
    if(this.isLoggedin())
    {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/']);
  }

  /**
   * 
   * @param id ID of user that change his pass
   * @param oldPass old password of account
   * @param newPass new password to set
   * @returns Observable that contains info about success of operation
   */
  changePassword(id, oldPass, newPass)
  {
    var data = {
      _id : id,
      oldPassword : oldPass,
      newPassord : newPass
    };
    return this.http.post(this.server+ 'user/changePass', data);
  }

}
