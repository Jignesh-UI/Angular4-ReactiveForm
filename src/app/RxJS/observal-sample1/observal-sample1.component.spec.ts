import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservalSample1Component } from './observal-sample1.component';

describe('ObservalSample1Component', () => {
  let component: ObservalSample1Component;
  let fixture: ComponentFixture<ObservalSample1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservalSample1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservalSample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
