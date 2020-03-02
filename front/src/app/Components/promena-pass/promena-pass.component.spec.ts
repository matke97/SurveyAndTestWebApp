import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaPassComponent } from './promena-pass.component';

describe('PromenaPassComponent', () => {
  let component: PromenaPassComponent;
  let fixture: ComponentFixture<PromenaPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromenaPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromenaPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
