import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Anketa } from 'src/app/Models/anketa';
import { AnketaService } from '../../Services/anketa.service';
import { PitanjeComponent } from '../pitanje/pitanje.component';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-anketa-kreiranje',
  templateUrl: './anketa-kreiranje.component.html',
  styleUrls: ['./anketa-kreiranje.component.css']
})


export class AnketaKreiranjeComponent implements OnInit {
  @ViewChildren('pitanjaComponent') pitanjaLista: QueryList<PitanjeComponent>;
  faza: number = 0;
  
 /* naziv:string;
  opis:string;
  pocetak : Date;
  kraj : Date;*/

  broj  = [];
  tip: string = 'anketa';
  model : Anketa = new Anketa();

  pitanja = [];
  selectedQuestion:any;
  brPitanja:number = 0;
  odgovori = [];
  brStranica : number = 1;
  personalizovana : boolean;
  autor : string;
  constructor(private service : AnketaService, private router: Router,private _location:Location) { }
  
  ngOnInit() {
    this.pitanja.push({label:'--Novo Pitanje--', value: null});
    var aa = this.service.getQuestions()
    .pipe(first())
    .subscribe(
      data => {
        console.log('ODJEEE');
        console.log(data);
        for(let i of data)
        {
          console.log(i);
          this.pitanja.push({label: i, value: i});
        }
      }

    );
    
   
    var usr = JSON.parse(localStorage.getItem('currentUser'));
    this.autor = usr.userName;
    /*for (let i = 0; i < 10000; i++) {
      this.items.push({label: 'Item ' + i, value: 'Item ' + i});
  }*/
   
  }

  next(event)
  {
   if(this.faza == 0)
   {
     this.prvafaza();
   }else if(this.faza == 1)
   {
     this.popunjenaPitanja();
   }else
   {
    this.trecaFaza();
   }
  }

  back(event)
  {
    if(this.faza != 0)
    {
      this.faza -= 1;
    }else
    {
      this._location.back();
    }
  }

  addQuest(event)
  {
    
    this.brPitanja =this.brPitanja +  1;
    
  }

  removeQuest(event)
  {
    if(this.brPitanja != 0)
      this.brPitanja -= 1;
  }

  test(event)
  {
    console.log('OVDEE');
    for(let a of this.pitanjaLista.toArray())
    {
      var bb = JSON.parse(a.test());
      console.log(bb);
    }
  }

  popunjenaPitanja()
  {
    this.model.pitanjaLista = [];
    for(let a of this.pitanjaLista.toArray())
    {
      var bb = a.returnQuestion();
      if(bb == null)
        return;
      
      this.model.pitanjaLista.push(bb);
        
      console.log('IZ ANKETAKREIRANJE');
      console.log(bb);
    }
    this.faza = 2;
  }

  prvafaza()
  {
    if(this.model.pocetak == null || this.model.naziv == null || this.model.kraj == null || this.model.opis == null)
    {
      alert('Popunite sva polja');
    }
    else
    {
      if(this.model.pocetak > this.model.kraj)
      {
        alert('Datum pocetka je veci od kraja :)');
      }
      else
      {
        if(this.tip == 'anketa')
        {

          this.odgovori = [
            {label:'Unos numericke vrednosti', value : 1},
            {label:'Unos kratkog texta', value : 2},
            {label:'Unos dugackog texta(textArea)', value : 3},
            {label:'Jedan  od vise ponudjenih(radiobutton)', value : 4},
            {label:'Vise od vise ponudjenih(checkbox)', value : 5}
          ];
          this.model.personalizovana = this.personalizovana;
          

        }else{

          this.odgovori = [
            {label:'Unos numericke vrednosti', value : 1},
            {label:'Unos kratkog texta', value : 2},
            
            {label:'Jedan  od vise ponudjenih(radiobutton)', value : 4},
            {label:'Vise od vise ponudjenih(checkbox)', value : 5}
          ];
          this.model.personalizovana = true;
        }
        this.model.tip = this.tip;
        this.faza = 1;
      } 
    }
  }

  trecaFaza()
  {
    console.log('Cela anketica');
    console.log(this.model);
    if(this.brStranica > this.brPitanja)
    {
      alert('Broj stranica mora da bude manji ili jednak broju pitanja');
      return null;
    }
    if(this.tip == 'test' && (this.model.vreme > 180 || this.model.vreme < 10))
    {
      alert('Minimalno vreme trajanja testa je 10s a maksimalno 180s(3minuta)');
      return null;
    }
    
    console.log("VREME BRE" ,this.model.vreme);
    this.model.autor = this.autor;
    this.model.brStrana = this.brStranica;
    this.service.unesiAnketu(this.model).
    pipe(first())
    .subscribe(
      data => 
      {
        alert('Vasa anketa/test je unet u sistem.');

        this.router.navigate(['/user/' + this.autor]);
      },
      error => {
        console.log(error.error);
        
        alert(error.error.error);
      }
    )
  }
}
