import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odg-shrot-txt',
  templateUrl: './odg-shrot-txt.component.html',
  styleUrls: ['./odg-shrot-txt.component.css']
})
export class OdgShrotTxtComponent implements OnInit {
  @Input('tip')tip:string;
  constructor() { }

  brOdgovora : number = 1;
  correctAnswer : string;
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
    return a;
  }

}
