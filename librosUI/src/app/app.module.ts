import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterLibroComponent } from './register-libro/register-libro.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VentaLibroComponent } from './venta-libro/venta-libro.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ToasterService } from './services/toaster.service';
import { SelectBookComponent } from './select-book/select-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterLibroComponent,
    NavBarComponent,
    VentaLibroComponent,
    LoginComponent,
    SelectBookComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuardService,
    ToasterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
