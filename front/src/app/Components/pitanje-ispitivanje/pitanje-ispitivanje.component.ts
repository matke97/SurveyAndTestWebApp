import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PitanjeModel } from 'src/app/Models/PitanjeModel';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-pitanje-ispitivanje',
  templateUrl: './pitanje-ispitivanje.component.html',
  styleUrls: ['./pitanje-ispitivanje.component.css']
})
export class PitanjeIspitivanjeComponent implements OnInit {
  @Input('pitanje')pitanje:PitanjeModel;
  @Input()odgovor: any;
  @Output()odgovorChange = new EventEmitter();
  
  //odgovor : any;
  constructor() { }

  ngOnInit() {
  }

  returnOdgovor()
  {
    return this.odgovor;
  }

  change(event)
  {
    console.log("AAAAA");
    this.odgovorChange.emit(this.odgovor);
  }

}
