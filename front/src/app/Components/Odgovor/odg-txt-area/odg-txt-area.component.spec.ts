import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdgTxtAreaComponent } from './odg-txt-area.component';

describe('OdgTxtAreaComponent', () => {
  let component: OdgTxtAreaComponent;
  let fixture: ComponentFixture<OdgTxtAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdgTxtAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdgTxtAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
