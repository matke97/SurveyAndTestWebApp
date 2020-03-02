import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-odg-radio-btn',
  templateUrl: './odg-radio-btn.component.html',
  styleUrls: ['./odg-radio-btn.component.css']
})
export class OdgRadioBtnComponent implements OnInit {
  @Input('tip')tip:string;
  brOdgovora : number = 1;
  options : Array<string> = new Array<string>();
  correctAnswer;
  constructor() { }

  ngOnInit() {
   // this.options.push();
  }

  addAnswer(event)
  {
    //this.options.push();
    this.brOdgovora += 1;
  }

  removeAnswer(event)
  {
    if(this.brOdgovora != 1)
    {
      this.options.pop();
      this.brOdgovora -= 1;
    }
  }
  returnAnswer()
  {
    if(this.tip == 'test' && this.correctAnswer == null)
    {
      alert('Unesi tacan odgovor');
      return null;
    }
    if(this.options.length != this.brOdgovora)
    {
      alert('Unesi tekst odgovra');
        return null;
    }
    for(let a of this.options)
    {
      if(a == null)
      {
        alert('Unesi tekst odgovra');
        return null;
      }
    }
    if(this.options.length == 1)
    {
      alert('Morate imati vise od 1 opciju');
      return null;
    }
    var a = {
      brojOdgovora: this.brOdgovora,
      odgovori: this.options,
      tacniOdgovori: this.correctAnswer
    };
    //console.log(a);
    return a;
  }

}
