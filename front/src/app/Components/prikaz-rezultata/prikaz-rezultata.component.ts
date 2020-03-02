import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnketaService } from 'src/app/Services/anketa.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-prikaz-rezultata',
  templateUrl: './prikaz-rezultata.component.html',
  styleUrls: ['./prikaz-rezultata.component.css']
})
export class PrikazRezultataComponent implements OnInit {

  anketa = JSON.parse(localStorage.getItem('AnketaPregled'));
  listici = [];
  grupniUspeh : any;
  zbirniIzv  = [];
  spremno = false;
  constructor(private service: AnketaService, private router:Router, private userService: UserService) { }

  ngOnInit() 
  {
    console.log(this.anketa);
  var serv =  this.service.getPopunjene(this.anketa._id)
    .subscribe(
      data => {
        for(let d of data)
        {
          this.listici.push(d); 
        }
        if(this.anketa.tip == 'test'){
          this.rezultati();
        }else
        {
         this.zbirni();
        }
       // console.log(this.listici.pitanja[0]);
       
        serv.unsubscribe();
      }
    );
  }

  ngOnDestroy()
  {
    localStorage.removeItem('AnketaPregled');
    

  }

  rezultati()
  {
    var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let l of this.listici)
    {
      var proc = l.osvojeno / l.maxPoena * 100;
      if(proc <= 10)
      {
        data[0] += 1;
      }else
      if(proc > 10 && proc <= 20)
      {
        data[1] += 1;
      }else
      if(proc > 20 && proc <= 30)
      {
        data[2] += 1;
      }else
      if(proc > 30 && proc <= 40)
      {
        data[3] += 1;
      }else
      if(proc > 40 && proc <= 50)
      {
        data[4] += 1;
      }else
      if(proc > 50 && proc <= 60)
      {
        data[5] += 1;
      }else
      if(proc > 60 && proc <= 70)
      {
        data[6] += 1;
      }else
      if(proc > 70 && proc <= 80)
      {
        data[7] += 1;
      }else
      if(proc > 80 && proc <= 90)
      {
        data[8] += 1;
      }else
      if(proc > 90 && proc <= 100)
      {
        data[9] += 1;
      }
    }
    this.grupniUspeh =
    {
      labels : ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
      datasets: [
        {
            label: 'Rezultati testa',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: data
        }]
    };
  }

  zbirni()
  {
    var pitanja = [];
    var labels = [];
    var numOdgovora = [];
    var brojPitanja = 0;
    var boje = ["#FF6384", "#36A2EB", "#FFCE56",  '#42A5F5', '#9CCC65'];
    if(this.listici.length != 0)
    {
      brojPitanja = this.listici[0].pitanja.length;
      pitanja = this.listici[0].pitanja;
      for(let i =0; i< brojPitanja; i++)
      {
        labels.push([]);
        numOdgovora.push([]);
        this.zbirniIzv.push({labels : [], datasets : []});
      }
    }else
    {
      return;
    }
    
    for(let list of this.listici)
    {
      
      //labels.push(list.)
      for(let i  in list.odgovori)
      {
        if(list.odgovori[i] != null)
        {
          var aa = list.odgovori[i].toString();
          var str = (aa.replace(/\s+/g, '')).toLowerCase();
          var ss =labels[i].indexOf(str);
          if(ss != -1)
          {
            numOdgovora[i][ss] += 1;
          }else
          {
            labels[i].push(str);
            numOdgovora[i][labels[i].length - 1] = 1;
          }
        }
      }
    }
    for(let i in pitanja)
    {
      this.zbirniIzv[i].labels = labels[i];
      this.zbirniIzv[i].datasets = [{data : numOdgovora[i]}];
      this.zbirniIzv[i].datasets[0].backgroundColor = [];
      let b : any;
      for(b in boje)
      {
        //console.log('BOJAAAA ', b);
        this.zbirniIzv[i].datasets[0].backgroundColor[b] = boje[b % 5];
      }
    }
    this.spremno = true;
    console.log('AAA', pitanja);
    console.log('VASI ODOGOVI', labels);
    console.log('BROJ pojavljivanja', numOdgovora);
    
  }

  zbirni2()
  {
    var pitanja = [];//sva pitanja
    var labels = [[]];//odgvori zapravo niz nizova
    var numOdgovora = [[]];
   // for(let pit of )
  }
  retHome()
  {
    this.router.navigate(['']);
  }
  logout()
  {
    this.userService.logOut();
  }

}
