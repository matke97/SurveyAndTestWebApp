import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegisterComponent} from './Components/register/register.component';
import {LoginComponent} from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';
import {AdminComponent} from './Components/admin/admin.component';
import { AnketaKreiranjeComponent } from './Components/anketa-kreiranje/anketa-kreiranje.component';
import { AdminGuard } from './Guards/admin.guard';
import { UserGuard } from './Guards/user.guard';
import { AnketaIspitivanjeComponent } from './Components/anketa-ispitivanje/anketa-ispitivanje.component';
import { IspitivanjeGuard } from './Guards/ispitivanje.guard';
import { AppComponent } from './app.component';
import { PromenaPassComponent } from './Components/promena-pass/promena-pass.component';
import { PrikazGuard } from './Guards/prikaz.guard';
import { PrikazRezultataComponent } from './Components/prikaz-rezultata/prikaz-rezultata.component';
const routes: Routes = [
{ path: 'register', component: RegisterComponent},

{
  path: '', component:AppComponent
},
{ path: 'login', component : LoginComponent},
{path : 'user/:username', component : UserComponent, canActivate : [UserGuard]},
{path : 'user/:username/changePass', component : PromenaPassComponent, canActivate : [UserGuard]},
{path : 'admin', component : AdminComponent, canActivate : [AdminGuard] },
{ path: 'kreiraj', component: AnketaKreiranjeComponent}, 
{ path: 'ispitivanje', component:AnketaIspitivanjeComponent, canActivate : [IspitivanjeGuard]},
{ path: 'anketa/izvestaj', component:PrikazRezultataComponent, canActivate : [PrikazGuard]},
{ path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
