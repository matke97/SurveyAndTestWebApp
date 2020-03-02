import { Component, OnInit, Input ,OnDestroy} from '@angular/core';
import { AnketaService } from 'src/app/Services/anketa.service';
import { Anketa } from 'src/app/Models/anketa';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {timer} from 'rxjs';
import { AnketaListic } from 'src/app/Models/AnketaListic';
import { ProgressBar } from 'primeng/progressbar/public_api';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-anketa-ispitivanje',
  templateUrl: './anketa-ispitivanje.component.html',
  styleUrls: ['./anketa-ispitivanje.component.css']
})
export class AnketaIspitivanjeComponent implements OnInit {
 // @Input('id')idAnk:number;
  idAnk;
  anketa : Anketa = new Anketa();
  trenutnaStrana = 0;
  questPerPage : number;
  ostatak :number;
  timeleft : number;
  odgovori : Array<any>;

  listic : AnketaListic = new AnketaListic();
  progresBar : number = 0;
  sub:any;
  zakljucena : boolean = false;
  message : string;
  result : number;
  maxP : number;
  poeniPoOdgovoru = [];
  constructor(private service : AnketaService ,private router: Router, private _location:Location, private userService:UserService) { }

  ngOnInit() 
  { 
    var aa = JSON.parse(localStorage.getItem('idAnk'));
    console.log(aa);
    this.idAnk = aa._id;
   
    this.listic._idAnkete = this.idAnk;
    this.listic._idUser = this.userService.getCurrentUser()._id;
    console.log(this.idAnk);
    const a =this.service.getAnketaByID(this.idAnk)
      .subscribe(
        data => 
        {
          this.anketa = data;
            console.log(data);
           
            this.questPerPage = ~~(this.anketa.pitanjaLista.length / this.anketa.brStrana);  
           
            this.ostatak = (this.anketa.pitanjaLista.length % this.anketa.brStrana); 
            this.odgovori = new Array<any>(data.pitanjaLista.length);

            for(let pit of data.pitanjaLista)
            {
              this.listic.pitanja.push(pit.tekstPitanja);
              this.listic.odgovori.push(null);
            }
            if(this.anketa.tip == 'test')
            {
              this.timeleft = this.anketa.vreme;
              const tim = timer(1000, 1000);
              this.sub = tim.subscribe(val => {
                
                if(this.timeleft == 0)
                {
                  this.istekloVreme();
                  this.sub.unsubscribe();
                }
                this.timeleft = this.anketa.vreme - val;
              });
            }
            if((this.anketa.tip == 'anketa' && this.anketa.personalizovana) || this.anketa.tip == 'test')
            {
              const usr = this.userService.getCurrentUser();
              this.listic.ispitanik.ime = usr.ime;
              this.listic.ispitanik.prezime = usr.prezime;
              this.listic.ispitanik.datum_rodj = usr.datum_rodj;
            }
            if(this.anketa.tip == 'anketa')
            {
              var temp =
              {
                _idAnkete : this.idAnk,
                _idUser : this.listic._idUser
              };
              var subsc = this.service.getNedovrsena(temp)
              .subscribe(data => {
                if(data)
                {
                  this.listic.odgovori = [];
                  for(let odg of data.odgovori)
                  {
                    this.listic.odgovori.push(odg);
                  }
                }
                subsc.unsubscribe();
              });
            }
            
            a.unsubscribe();
        });
  }
  next(event)
  {
    if(this.trenutnaStrana + 1 < this.anketa.brStrana)
    {
      this.trenutnaStrana += 1;
    }
    else
    { 
      if(this.trenutnaStrana +1 == this.anketa.brStrana)
      {
        this.popuniPrograsBar();

        this.trenutnaStrana += 1;
      } 
      else if(this.trenutnaStrana == this.anketa.brStrana)
      {
        if(this.anketa.tip == 'anketa')
        {
          if(!this.checkRequired())
          {
            alert('Popunite sva obavezna polja za anektu - sa *');
            return;
          }
          const obj =this.service.submitSurvey(this.listic)
          .subscribe(
            data =>{
              console.log(data);
              this.message = 'Uspesno ste popunili anketu';
              this.zakljucena = true;
              obj.unsubscribe();      
            }
          );
        }
        if(this.anketa.tip == 'test')
        {
          this.sub.unsubscribe();
         const obj = this.service.submitTest(this.listic)
          .subscribe
          ( data => {
            if(data)
            {
              this.message = 'Uspesno ste popunili test, broj osvojenih poena:';
              this.result= data.osvojenoPoena;
              this.maxP = data.maxPoena;
              this.poeniPoOdgovoru = data.osvojenoPoPitanju;
              this.zakljucena = true;
            }
            obj.unsubscribe();
          });
        }
        this.trenutnaStrana += 1;
      }else
      {
        localStorage.removeItem('idAnk');
          this.router.navigate(['']);
      }
    }
  }

  back(event)
  {
    if(this.trenutnaStrana > this.anketa.brStrana || this.trenutnaStrana == 0)
    {
      localStorage.removeItem('idAnk');
      this._location.back();
    }else
    {    
      this.trenutnaStrana -= 1;
    }
  }
  
  popuniPrograsBar()
  {
    this.progresBar = 0;
    
      for(let i in this.listic.pitanja)
      {
        if(this.listic.odgovori[i] != null && this.listic.odgovori[i] != '' && this.listic.odgovori[i] != [])
        {
          this.progresBar += 1;
        }
      }
      this.progresBar = 100 * (this.progresBar / this.anketa.pitanjaLista.length);
    
  }
  checkRequired()
  {
    if(this.anketa.tip == 'anketa')
    {
      for(let i in this.listic.pitanja)
      {
        if(this.anketa.pitanjaLista[i].obavezno && (this.listic.odgovori[i] == null || this.listic.odgovori[i] == '' || this.listic.odgovori[i] == []))
          return false;
      }
      return true;
    }
  }

  istekloVreme()
  {
    alert('Isteklo vam je vreme');
    const obj = this.service.submitTest(this.listic)
          .subscribe
          ( data => {
            if(data)
            {
              this.message = 'Uspesno ste popunili test, broj osvojenih poena:';
              this.result= data.osvojenoPoena;
              this.maxP = data.maxPoena;
              this.poeniPoOdgovoru = data.osvojenoPoPitanju;
              this.zakljucena = true;
            }
            this.trenutnaStrana = this.anketa.brStrana + 1 ;
            obj.unsubscribe();
          });

  }

  logout(event)
  {
    this.userService.logOut();
  }

  ngOnDestroy(){
    if(this.anketa.tip == 'test')
    {

      this.sub.unsubscribe();
      if(!this.zakljucena)
      {
      var ss = this.service.submitTest(this.listic)
      .subscribe(
        data =>
        {
          console.log('SACUVANO STANJE');
          this.result = data.osvojenoPoena;
          alert('Izlaskom ste submitovali test poeni - ' + this.result);
          ss.unsubscribe();
        });
      }

    }
    else
    {

      //anketa
      if(!this.zakljucena)
      {
        
       var ss = this.service.saveState(this.listic)
        .subscribe(
          data =>
          {
            console.log('SACUVANO STANJE');
            ss.unsubscribe();
          }
        );
      }


    }
    
    console.log("IZLAZ ODAVDE!");
  }

  retHome(event)
  {
    this.router.navigate(['']);
  }
}
