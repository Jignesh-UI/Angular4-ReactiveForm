import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservalSample4Component } from './observal-sample4.component';

describe('ObservalSample4Component', () => {
  let component: ObservalSample4Component;
  let fixture: ComponentFixture<ObservalSample4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservalSample4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservalSample4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
