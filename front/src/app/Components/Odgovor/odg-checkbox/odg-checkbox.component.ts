import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odg-checkbox',
  templateUrl: './odg-checkbox.component.html',
  styleUrls: ['./odg-checkbox.component.css']
})
export class OdgCheckboxComponent implements OnInit {
  @Input('tip')tip:string;

  brOdgovora : number = 1;
  options : Array<string> = new Array<string>();
  correctAnswers : string[] = [];
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
      this.correctAnswers = [];
      this.brOdgovora -= 1;
    }
  }

  returnAnswer()
  {
    if(this.tip == 'test' && this.correctAnswers.length == 0)
    {
      alert('Morate imate bar 1 tacan odgovor');
      return null;
    }
    if(this.options.length != this.brOdgovora)
    {
      alert('Unesi tekst odgovra');
      return null;
    }
    if(this.options.length == 1)
    {
      alert('Morate imati vise od 1 opciju');
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

    var a = {
      brojOdgovora: this.brOdgovora,
      odgovori: this.options,
      tacniOdgovori: this.correctAnswers
    };
    //console.log(a);
    return a;
  }

}
