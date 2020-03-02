import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AnketaService } from '../../Services/anketa.service';
import { PitanjeModel } from 'src/app/Models/PitanjeModel';
import { OdgNumVrednostComponent } from '../Odgovor/odg-num-vrednost/odg-num-vrednost.component';
import { OdgShrotTxtComponent } from '../Odgovor/odg-shrot-txt/odg-shrot-txt.component';
import { OdgTxtAreaComponent } from '../Odgovor/odg-txt-area/odg-txt-area.component';
import { OdgRadioBtnComponent } from '../Odgovor/odg-radio-btn/odg-radio-btn.component';
import { OdgCheckboxComponent } from '../Odgovor/odg-checkbox/odg-checkbox.component';
@Component({
  selector: 'app-pitanje',
  templateUrl: './pitanje.component.html',
  styleUrls: ['./pitanje.component.css']
})
export class PitanjeComponent implements OnInit {
  @ViewChild('answer1')answer1:OdgNumVrednostComponent;
  @ViewChild('answer2')answer2:OdgShrotTxtComponent;
  @ViewChild('answer3')answer3:OdgTxtAreaComponent;
  @ViewChild('answer4')answer4:OdgRadioBtnComponent;
  @ViewChild('answer5')answer5:OdgCheckboxComponent;

  @Input() pitanja: Array<any>;
  @Input() odgovori: Array<any>;
  @Input() tip:string;
  novoPitanje:string;
  selectedQuestion :string;
  selectedAnsType = 1;

  question : PitanjeModel = new PitanjeModel();
 //pitanja = [];

 obavezno :boolean = false;

  constructor(private service: AnketaService) { }

  ngOnInit() {
    

  }

  test()
  {
    console.log("JEEEEJEJEJEEJEJE");
    this.answer1.test();
    return JSON.stringify({objekat: 'OBJ1', value: "VAL1"});
  }

  returnQuestion()
  {
    if(this.selectedQuestion == null)
    {
      if(this.novoPitanje == null)
      {
        alert('Popunite text pitanja.');
        return null;
      }
      this.question.tekstPitanja = this.novoPitanje;
    }
    else
    {
      this.question.tekstPitanja = this.selectedQuestion;
      
    }
    this.question.tipOdgovra = this.selectedAnsType;
    var retAnswerVar;
    switch(this.selectedAnsType)
    {
      case 1:
        {
          retAnswerVar = this.answer1.returnAnswer();
          break;
        }
      case 2:
        {
          retAnswerVar = this.answer2.returnAnswer();
          break;
        }
      case 3:
        {
          retAnswerVar = this.answer3.returnAnswer();
          break;
        }
      case 4:
        {
          retAnswerVar = this.answer4.returnAnswer();
          break;
        }
      case 5:
        {
          retAnswerVar = this.answer5.returnAnswer();
          break;
        }
    }
    if(retAnswerVar == null)
      return null;

    if(this.tip == 'test' && (this.question.brPoena <= 0 || this.question.brPoena == null))
    {
      
      alert('unesi ispravan broj poena');
      return null;
    }

    if(this.tip == 'anketa')
    {
    
      this.question.obavezno = this.obavezno;
    }

    
    this.question.brojOdgovora = retAnswerVar.brojOdgovora;
    this.question.tacanOdgovor = retAnswerVar.tacniOdgovori;
    this.question.odgovori = retAnswerVar.odgovori;
    return this.question;
  }

}
