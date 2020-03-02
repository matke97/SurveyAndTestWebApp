import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnketaVizuelizacijaComponent } from './anketa-vizuelizacija.component';

describe('AnketaVizuelizacijaComponent', () => {
  let component: AnketaVizuelizacijaComponent;
  let fixture: ComponentFixture<AnketaVizuelizacijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnketaVizuelizacijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketaVizuelizacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
