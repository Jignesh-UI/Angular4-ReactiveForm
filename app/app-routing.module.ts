import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CustomPreloadingService } from './custom-preloading.service';

export const router: Routes = [
  { path: 'registration', component: RegistrationComponent, children: [] },
  { path: 'login', component: LoginComponent, children: [] },
  { path: 'dsr', data: { preload: true }, loadChildren: './dsr/dsr.module#DsrModule' },
  { path: 'RxJS', data: { preload: false }, loadChildren: './RxJS/rx-sample.module#RxJSModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router,
  {
    preloadingStrategy: CustomPreloadingService
  }
);
