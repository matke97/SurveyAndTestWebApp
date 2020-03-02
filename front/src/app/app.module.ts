import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './Components/register/register.component';
import {ListboxModule} from 'primeng/listbox';

//PRIME NG COMPONENTS

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
//primeng end

import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AnketaKreiranjeComponent } from './Components/anketa-kreiranje/anketa-kreiranje.component';
import { PitanjeComponent } from './Components/pitanje/pitanje.component';
import {ToolbarModule} from 'primeng/toolbar';
import { OdgNumVrednostComponent } from './Components/Odgovor/odg-num-vrednost/odg-num-vrednost.component';
import { OdgShrotTxtComponent } from './Components/Odgovor/odg-shrot-txt/odg-shrot-txt.component';
import { OdgRadioBtnComponent } from './Components/Odgovor/odg-radio-btn/odg-radio-btn.component';
import { OdgCheckboxComponent } from './Components/Odgovor/odg-checkbox/odg-checkbox.component';
import { OdgTxtAreaComponent } from './Components/Odgovor/odg-txt-area/odg-txt-area.component';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AnketaIspitivanjeComponent } from './Components/anketa-ispitivanje/anketa-ispitivanje.component';
import { PitanjeIspitivanjeComponent } from './Components/pitanje-ispitivanje/pitanje-ispitivanje.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {TabViewModule} from 'primeng/tabview';
import {ChartModule} from 'primeng/chart';
//end PRIME NG c

import { RecaptchaModule } from 'ng-recaptcha';
import { PrikazRezultataComponent } from './Components/prikaz-rezultata/prikaz-rezultata.component';
import { PromenaPassComponent } from './Components/promena-pass/promena-pass.component';
import { AnketaVizuelizacijaComponent } from './Components/anketa-vizuelizacija/anketa-vizuelizacija.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    AnketaKreiranjeComponent,
    PitanjeComponent,
    OdgNumVrednostComponent,
    OdgShrotTxtComponent,
    OdgRadioBtnComponent,
    OdgCheckboxComponent,
    OdgTxtAreaComponent,
    AnketaIspitivanjeComponent,
    PitanjeIspitivanjeComponent,
    PrikazRezultataComponent,
    PromenaPassComponent,
    AnketaVizuelizacijaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DropdownModule,
    ListboxModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolbarModule,
    CheckboxModule,
    InputSwitchModule,
    ProgressBarModule,
    TabViewModule,
    ChartModule,
    RecaptchaModule.forRoot()
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
