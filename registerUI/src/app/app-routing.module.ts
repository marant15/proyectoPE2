import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RProfesorComponent} from './r-profesor/r-profesor.component'

const routes: Routes = [
    {path: '', redirectTo: '/rprofesor', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'rprofesor', component: RProfesorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
