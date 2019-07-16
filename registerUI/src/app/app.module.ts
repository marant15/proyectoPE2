import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RProfesorComponent } from './r-profesor/r-profesor.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RCsComponent } from './r-cs/r-cs.component';
import { AssignComponent } from './assign/assign.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ReportsComponent } from './reports/reports.component';
import { ExcelService } from './services/excel.service';
import { ToasterService } from './services/toaster.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RProfesorComponent,
    NavBarComponent,
    RCsComponent,
    AssignComponent,
    MenuBarComponent,
    RegisterComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    ExcelService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
