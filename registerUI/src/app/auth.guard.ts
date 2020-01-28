import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './services/admin.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private _adminService: AdminService,private myRoute: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this._adminService.isLoggedin()){
      return true;
    }else{
      this.myRoute.navigate(["login"]);
      return false;
    }
  }
}
