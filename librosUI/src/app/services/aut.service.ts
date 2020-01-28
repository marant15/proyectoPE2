import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import config from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class AutService {

  constructor(private _http: HttpClient, private myRoute: Router, private toasterService: ToasterService) { }

  login(user:string,pwd:string){
    return this._http.post("http://"+config.hostServer+":4000/aut/usuario",
    {
      "usuario":user,
      "password":pwd
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.status==200){
        localStorage.setItem('token',user);
        if(config.defaultPassword == pwd && user!=''){
          //localStorage.setItem('codigo',user);
          //this.myRoute.navigate(["editpwdD"]);
        }else{
          this.myRoute.navigate(["register"]);
        }
      }
    },
    error  => {
      console.log("Error", error);
      if(error.status==400){
        this.toasterService.error("Password o usuario incorrecto");
      } 
    });
  }

  isLoggedin(){
    if(localStorage.getItem('token')!=null){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
    this.myRoute.navigate(["login"]);
  }
}
