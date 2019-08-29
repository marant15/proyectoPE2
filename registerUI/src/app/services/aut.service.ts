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

  entry(user:string,pwd:string,date:string,time:string,image:string){
    return this._http.post("http://"+config.hostServer+":4000/aut/profesor",
    {
      "codigo":user,
      "password":pwd,
      "tiempo":time,
      "fecha":date,
      "image":image
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.body==="no existe asignacion"){
        this.toasterService.info("No existe una asignacion en el horario actual");
      }else if(res.body.split(" ")[0]==="ya"){
        this.toasterService.warning("Ya existe un registro para este horario");
      }else{
        if(config.defaultPassword==pwd && user !=''){
          localStorage.setItem('tipo','profesor');
          localStorage.setItem('codigo',user);
          this.myRoute.navigate(["editpwdD"]);
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

  excep(assig:number,tipo:string,pid:number,fecha:string,tiempo:string){
    return this._http.post("http://"+config.hostServer+":4000/aut/exc",
    {
      "asignacionID":assig,
      "tipo":tipo,
      "profesorID":pid,
      "tiempo":tiempo,
      "fecha":fecha
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);
      this.toasterService.success("Excepcion guardada correctamente");
    },
    error  => {
      console.log("Error", error);
    });
  }

  updatePpwd(pid:string,oldpwd:string,newpwd:string){
    return this._http.put("http://"+config.hostServer+":4000/aut/profesor/"+pid,{
      "oldPassword": oldpwd,
      "password": newpwd
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.body === 'updated'){
        this.toasterService.success("Password cambiado correctamente");
        this.myRoute.navigate(["rprofesor"]);

      }else{
        this.toasterService.error("No se pudo cambiar password")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  updateUpwd(pid:string,oldpwd:string,newpwd:string){
    return this._http.put("http://"+config.hostServer+":4000/aut/usuario/"+pid,{
      "oldPassword": oldpwd,
      "password": newpwd
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.body === 'updated'){
        this.toasterService.success("Password cambiado correctamente");
        this.myRoute.navigate(["rprofesor"]);

      }else{
        this.toasterService.error("No se pudo cambiar password")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  resetPPassword(id:string){
    return this._http.get("http://"+config.hostServer+":4000/aut/profesor/"+id,{
      responseType: 'text',
      observe:'response'
    });
  }

  resetUPassword(id:string){
    return this._http.get("http://"+config.hostServer+":4000/aut/usuario/"+id,{
      responseType: 'text',
      observe:'response'
    });
  }

  getImage(codigo:string){
    return "http://"+config.hostServer+":4000/aut/image/"+codigo;
  }
}
