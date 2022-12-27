import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './services/interceptors';
import { ModalModule } from 'ngx-bootstrap/modal';





@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
      newestOnTop: false,

    }),
    ModalModule.forRoot()
  ],
  // httpInterceptorProviders
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
