import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RProfesorComponent} from './r-profesor/r-profesor.component';
import { RCsComponent} from './r-cs/r-cs.component';
import { AssignComponent} from './assign/assign.component';


const routes: Routes = [
    {path: '', redirectTo: '/rprofesor', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'rprofesor', component: RProfesorComponent},
    {path: 'rcs',component: RCsComponent},
    {path: 'assign',component: AssignComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
