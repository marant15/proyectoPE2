import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import config from '../../assets/config.json';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient, private myRoute: Router, private toasterService: ToasterService){ }

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

  isadmin(){
    var user = localStorage.getItem('token');
    return this._http.get("http://"+config.hostServer+":4000/admin/usuario/"+user);
  }

  getusers(){
    return this._http.get("http://"+config.hostServer+":4000/admin/usuario/");
  }

  getuser(user:string){
    return this._http.get("http://"+config.hostServer+":4000/admin/usuario/"+user);
  }

  regusuario(user:string,pwd:string,admin:boolean,name:string,pln:string,mln:string){
    console.log("registrando");
    return this._http.post("http://"+config.hostServer+":4000/admin/reg",
    {
      "usuario":user,
	    "password":pwd,
	    "isAdmin":admin,
	    "nombre":name,
	    "apellidoP":pln,
	    "apellidoM":mln
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.body === 'saved'){
        this.toasterService.success("Usuario guardado correctamente");
      }else{
        this.toasterService.error("El usuario ya existe")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  updateuser(pid:string,name:string,admin:boolean,pln:string,mln:string,user:string){
    return this._http.put("http://"+config.hostServer+":4000/admin/reg/"+pid,{
      "usuario":user,
	    "isAdmin":admin,
	    "nombre":name,
	    "apellidoP":pln,
      "apellidoM":mln
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.body === 'updated'){
        this.toasterService.success("Usuario editado correctamente");
        this.myRoute.navigate(["cusers"]);
      }else{
        this.toasterService.error("No se pudo actualizar el Usuario")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }
}