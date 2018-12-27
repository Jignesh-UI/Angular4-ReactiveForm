import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { LeftNavComponent } from './common/left-nav/left-nav.component';
import { LeftProfileComponent } from './common/left-profile/left-profile.component';
import { CustomPreloadingService } from './custom-preloading.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    LeftNavComponent,
    LeftProfileComponent
  ],
  imports: [
    BrowserModule, SharedModule, HttpClientModule, routes
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ HeaderComponent, FooterComponent ],
  providers: [ CustomPreloadingService ],
  bootstrap: [AppComponent],
  exports: [ HeaderComponent, FooterComponent ]
})
export class AppModule { }
