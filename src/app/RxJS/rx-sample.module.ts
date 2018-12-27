import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxJSRoutes } from './rx-jsrouting.module';

import { SharedModule } from '../shared/shared.module';

import { RxjsComponent } from './rxjs/rxjs.component';
import { ObservalSample1Component } from './observal-sample1/observal-sample1.component';
import { ObservalSample2Component } from './observal-sample2/observal-sample2.component';
import { ObservalSample3Component } from './observal-sample3/observal-sample3.component';
import { ObservalSample4Component } from './observal-sample4/observal-sample4.component';

@NgModule({
  imports: [
    CommonModule,
    RxJSRoutes,
    SharedModule
  ],
  declarations: [RxjsComponent,
    ObservalSample1Component,
    ObservalSample2Component,
    ObservalSample3Component,
    ObservalSample4Component],
  exports: []
})
export class RxJSModule { }
