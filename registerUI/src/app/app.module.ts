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
import { CusersComponent } from './cusers/cusers.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { ExcepcionesComponent } from './excepciones/excepciones.component';
import { EditAsigComponent } from './edit-asig/edit-asig.component';
import { SelectAsigComponent } from './select-asig/select-asig.component';
import {WebcamModule} from 'ngx-webcam';

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
    CusersComponent,
    ConfirmationDialogComponent,
    ExcepcionesComponent,
    EditAsigComponent,
    SelectAsigComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    WebcamModule,
  ],
  providers: [
    AuthGuard,
    ExcelService,
    ToasterService,
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule { }
