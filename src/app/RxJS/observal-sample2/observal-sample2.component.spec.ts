import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservalSample2Component } from './observal-sample2.component';

describe('ObservalSample2Component', () => {
  let component: ObservalSample2Component;
  let fixture: ComponentFixture<ObservalSample2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservalSample2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservalSample2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
