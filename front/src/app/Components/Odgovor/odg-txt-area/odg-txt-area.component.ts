import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odg-txt-area',
  templateUrl: './odg-txt-area.component.html',
  styleUrls: ['./odg-txt-area.component.css']
})
export class OdgTxtAreaComponent implements OnInit {
  @Input('tip')tip:string;
  //correctAnswer : string;
  constructor() { }

  ngOnInit() {
  }

  returnAnswer()
  {
    var a = {
      brojOdgovora: 1,
      odgovori: null,
      tacniOdgovori: null
    };
    return a;
  }


}
