import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import config from '../../assets/config.json';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

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
          localStorage.setItem('tipo','usuario');
          localStorage.setItem('codigo',user);
          this.myRoute.navigate(["editpwdD"]);
        }else{
          this.myRoute.navigate(["rprofesor"]);
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
}
