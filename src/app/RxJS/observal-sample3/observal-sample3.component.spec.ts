import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservalSample3Component } from './observal-sample3.component';

describe('ObservalSample3Component', () => {
  let component: ObservalSample3Component;
  let fixture: ComponentFixture<ObservalSample3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservalSample3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservalSample3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
