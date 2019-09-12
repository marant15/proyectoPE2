import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterLibroComponent } from './register-libro/register-libro.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VentaLibroComponent } from './venta-libro/venta-libro.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterLibroComponent,
    NavBarComponent,
    VentaLibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
