import { Component, OnInit } from '@angular/core';
import {User} from '../../Models/user';
import { AnketaService } from 'src/app/Services/anketa.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

import { orderBy } from 'lodash';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user  = JSON.parse(localStorage.getItem('currentUser'));
  dostupniTestovi :   any[]   = [];
  dostupneAnkete  :   any[]   = [];
  selectedAnketa  :   any = null ;
  selectedTest    :   any  = null;
  idA : number;
  //anketaIspitaj : boolean = false; 
  mojeAnkete : any[] = [];
  selectedMojaAnketa = null;

  sortBy = [
    {label :"Nazivu rastuce A-Z", value : 0},
    {label :"Nazivu opadajuce Z-A", value : 1},
    {label :"Datumu pocetka rastuce", value : 2},
    {label :"Datumu pocetka opadajuce", value : 3},
    {label :"Datumu kraja rastuce", value : 4},
    {label :"Datumu kraja opadajuce", value : 5}];
  selectedSortType = 0;
  constructor(private service: AnketaService, private userService: UserService, private router:Router) { }
  //danasnji = new Date();
  ngOnInit() {
    var pom;
    console.log("LOGOVANI",this.user._id);
    let obser = this.service.getDostupneAnketeTestove(this.user._id ,this.user.userName)
    .pipe(first())
    .subscribe(
      data =>
      {
        if(data)
        {
          for(let i in data)
          {
            data[i].pocetak = new Date(data[i].pocetak);
            data[i].kraj = new Date(data[i].kraj);
            if(data[i].tip == 'test')
            {
              this.dostupniTestovi.push({label: data[i].naziv, value: data[i]});
            }
            else
            {
              this.dostupneAnkete.push({label: data[i].naziv, value: data[i]});
            }
           
          }
         this.dostupniTestovi.sort((a, b) => (a.value.naziv > b.value.naziv) ? 1 : ((b.value.naziv > a.value.naziv) ? -1 : 0));
         this.dostupneAnkete.sort((a, b) => (a.value.naziv > b.value.naziv) ? 1 : ((b.value.naziv > a.value.naziv) ? -1 : 0));
        }
        obser.unsubscribe();
      });
 
      if(this.user.tip == 'kreator')
      {
       
        this.service.getMojeAnkete(this.user.userName)
        .subscribe(
         data => {
          if(data)
          {
            for(let d of data)
            {
              this.mojeAnkete.push({label : d.naziv, value : d});
            }
          }
         });
      }

      
  }
  private getMojeAnkete()
  {
    
    this.mojeAnkete =[];
    this.service.getMojeAnkete(this.user.userName)
    .subscribe(
      data => {
        if(data)
        {
          for(let d of data)
          {
            this.mojeAnkete.push({label : d.naziv, value : d});
          }
        }
      });
  }
  popuni(event)
  {
    
    console.log(event.target.innerHTML);
    if(event.target.innerHTML == 'Popuni anketu')
    {
      this.idA = this.selectedAnketa._id;
    }else
    {
      this.idA = this.selectedTest._id;
    }
    //this.anketaIspitaj = true;
    var idObj = {
      _id : this.idA
    };
    localStorage.setItem('idAnk', JSON.stringify(idObj));
    this.router.navigateByUrl('/ispitivanje');
    
  }

  obrisiAnketu(event)
  {
    this.service.obrisiAnketu(this.selectedMojaAnketa._id)
    .subscribe(
      data => 
      {
        if(data)
        {
          alert('Anketa je uspesno obrisana');
          this.selectedMojaAnketa = null;
          this.getMojeAnkete();
        }
      }
    );
  }

  kreirajNovu(event)
  {
    
    this.router.navigate(['/kreiraj']);
  }
  logout(event)
  {
    this.userService.logOut();
  }


  sortiraj()
  {
    switch(this.selectedSortType)
    {
      case 0:
          this.dostupniTestovi.sort((a, b) => (a.value.naziv > b.value.naziv) ? 1 : ((b.value.naziv > a.value.naziv) ? -1 : 0));
          this.dostupneAnkete.sort((a, b) => (a.value.naziv > b.value.naziv) ? 1 : ((b.value.naziv > a.value.naziv) ? -1 : 0));
          break;
      case 1:
          this.dostupniTestovi.sort((a, b) => (a.value.naziv < b.value.naziv) ? 1 : ((b.value.naziv < a.value.naziv) ? -1 : 0));
          this.dostupneAnkete.sort((a, b) => (a.value.naziv < b.value.naziv) ? 1 : ((b.value.naziv < a.value.naziv) ? -1 : 0));
          break;
      case 2:
          this.dostupniTestovi.sort((a, b) =>(a.value.pocetak > b.value.pocetak) ? 1 : ((b.value.pocetak > a.value.pocetak) ? -1 : 0));
          this.dostupneAnkete.sort((a, b) =>(a.value.pocetak > b.value.pocetak) ? 1 : ((b.value.pocetak > a.value.pocetak) ? -1 : 0));
          break;
      case 3:
          this.dostupniTestovi.sort((a, b) =>(a.value.pocetak < b.value.pocetak) ? 1 : ((b.value.pocetak < a.value.pocetak) ? -1 : 0));
          this.dostupneAnkete.sort((a, b) =>(a.value.pocetak < b.value.pocetak) ? 1 : ((b.value.pocetak < a.value.pocetak) ? -1 : 0));
          break;
      case 4:
          this.dostupniTestovi.sort((a, b) =>(a.value.kraj > b.value.kraj) ? 1 : ((b.value.kraj > a.value.kraj) ? -1 : 0));
          this.dostupneAnkete.sort((a, b) =>(a.value.kraj > b.value.kraj) ? 1 : ((b.value.kraj > a.value.kraj) ? -1 : 0));
          break;
      case 5:
          this.dostupniTestovi.sort((a, b) =>(a.value.kraj < b.value.kraj) ? 1 : ((b.value.kraj < a.value.kraj) ? -1 : 0));
          this.dostupneAnkete.sort((a, b) =>(a.value.kraj < b.value.kraj) ? 1 : ((b.value.kraj < a.value.kraj) ? -1 : 0));
          break;

    }
    
  }
  chPass()
  {
    this.router.navigate([this.router.url + '/changePass']);
  }
  pogledajRez(event)
  {
    localStorage.setItem('AnketaPregled', JSON.stringify(this.selectedMojaAnketa));
    this.router.navigate(['anketa/izvestaj']);
  }

}
