import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservalSample1Component } from './observal-sample1/observal-sample1.component';
import { ObservalSample2Component } from './observal-sample2/observal-sample2.component';
import { ObservalSample3Component } from './observal-sample3/observal-sample3.component';
import { ObservalSample4Component } from './observal-sample4/observal-sample4.component';
import { RxjsComponent } from './rxjs/rxjs.component';



export const router: Routes = [
  { path: '', component: RxjsComponent },
  { path: 'observalSample1', component: ObservalSample1Component },
  { path: 'observalSample2', component: ObservalSample2Component },
  { path: 'observalSample3', component: ObservalSample3Component },
  { path: 'observalSample4', component: ObservalSample4Component }
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class RxJSRoutes {}

