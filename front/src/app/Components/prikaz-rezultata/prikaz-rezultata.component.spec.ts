import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazRezultataComponent } from './prikaz-rezultata.component';

describe('PrikazRezultataComponent', () => {
  let component: PrikazRezultataComponent;
  let fixture: ComponentFixture<PrikazRezultataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrikazRezultataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazRezultataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
