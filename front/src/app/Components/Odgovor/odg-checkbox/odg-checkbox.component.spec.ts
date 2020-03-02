import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdgCheckboxComponent } from './odg-checkbox.component';

describe('OdgCheckboxComponent', () => {
  let component: OdgCheckboxComponent;
  let fixture: ComponentFixture<OdgCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdgCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdgCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
