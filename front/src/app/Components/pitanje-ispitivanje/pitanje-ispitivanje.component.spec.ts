import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitanjeIspitivanjeComponent } from './pitanje-ispitivanje.component';

describe('PitanjeIspitivanjeComponent', () => {
  let component: PitanjeIspitivanjeComponent;
  let fixture: ComponentFixture<PitanjeIspitivanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitanjeIspitivanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitanjeIspitivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
