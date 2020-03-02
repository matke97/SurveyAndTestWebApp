import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnketaIspitivanjeComponent } from './anketa-ispitivanje.component';

describe('AnketaIspitivanjeComponent', () => {
  let component: AnketaIspitivanjeComponent;
  let fixture: ComponentFixture<AnketaIspitivanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnketaIspitivanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketaIspitivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
