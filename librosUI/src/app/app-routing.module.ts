import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterLibroComponent } from "./register-libro/register-libro.component";
import { VentaLibroComponent } from "./venta-libro/venta-libro.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from './guards/auth-guard.service';
import { SelectBookComponent } from './select-book/select-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterLibroComponent, canActivate: [AuthGuardService]},
  {path: 'ventas', component: VentaLibroComponent, canActivate: [AuthGuardService]},
  {path: 'selectB', component: SelectBookComponent, canActivate: [AuthGuardService]},
  {path: 'editB', component: EditBookComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
