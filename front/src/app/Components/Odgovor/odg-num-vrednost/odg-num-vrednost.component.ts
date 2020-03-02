import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-odg-num-vrednost',
  templateUrl: './odg-num-vrednost.component.html',
  styleUrls: ['./odg-num-vrednost.component.css']
})
export class OdgNumVrednostComponent implements OnInit {
  
  @Input('tip')tip:string;
  constructor() { }
  brOdgovora : number = 1;
  correctAnswer : number;
  ngOnInit() {
  }
  addAnswer(event)
  {
    this.brOdgovora += 1;
  }

  removeAnswer(event)
  {
    if(this.brOdgovora != 0)
      this.brOdgovora -= 1;
  }

  test() {
    console.log("RADI BREEE!!!!");
  }

  returnAnswer()
  {
    if(this.tip == 'test' && this.correctAnswer == null)
    {
      alert('Unesi tacan odgovor');
      return null;
    }

    var a = {
      brojOdgovora: this.brOdgovora,
      odgovori: null,
      tacniOdgovori: this.correctAnswer
    };
   // console.log(a);
    return a;
  }
}
