import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RProfesorComponent} from './r-profesor/r-profesor.component';
import { RCsComponent} from './r-cs/r-cs.component';
import { AssignComponent} from './assign/assign.component';
import { RegisterComponent} from './register/register.component';

import { ReportsComponent} from './reports/reports.component'
import { CusersComponent} from './cusers/cusers.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
    {path: '', redirectTo: '/register', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'rprofesor', component: RProfesorComponent, canActivate: [AuthGuard]},
    {path: 'rcs',component: RCsComponent, canActivate: [AuthGuard]},
    {path: 'assign',component: AssignComponent, canActivate: [AuthGuard]},
    {path: 'report',component: ReportsComponent, canActivate: [AuthGuard]},
    {path: 'cusers',component: CusersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
