import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterLibroComponent } from "./register-libro/register-libro.component";
import { VentaLibroComponent } from "./venta-libro/venta-libro.component";

const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'register', component: RegisterLibroComponent},
  {path: 'ventas', component: VentaLibroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
