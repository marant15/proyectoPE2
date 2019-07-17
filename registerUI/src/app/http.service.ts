import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //@ViewChild(Ng2PopupComponent) popup: Ng2PopupComponent;

  
  
  islogged:boolean = false;

  result:any;

  constructor(private _http: HttpClient, private myRoute: Router){ }

  isLoggedin(){
    if(localStorage.getItem('token')!=null){
      return true;
    }
    return false;
  }

  isadmin(){
    var user = localStorage.getItem('token');
    return this._http.get("http://localhost:4000/admin/usuario/"+user);
  }
  
  login(user:string,pwd:string){
    return this._http.post("http://localhost:4000/aut/usuario",
    {
      "usuario":user,
      "password":pwd
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);
      if(res.status==200){
        this.myRoute.navigate(["rprofesor"]);
        localStorage.setItem('token',user);
      }
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.myRoute.navigate(["login"]);
  }

  entry(user:string,pwd:string,date:string,time:string){
    return this._http.post("http://localhost:4000/aut/profesor",
    {
      "codigo":user,
      "password":pwd,
      "tiempo":time,
      "fecha":date
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);

    });
  }

  getprofesor(){
    return this._http.get("http://localhost:4000/courses/profesor");
  }

  getmateria(){
    return this._http.get("http://localhost:4000/courses/materia");
  }

  getgrupo(){
    return this._http.get("http://localhost:4000/courses/grupo");
  }

  getfirmas(finicio:string,ffin:string,codigo:string){
    return this._http.get("http://localhost:4000/courses/registros/"+finicio+"/"+ffin+"/"+codigo);
  }

  getexcepciones(finicio:string,ffin:string,codigo:string){
    return this._http.get("localhost:4000/courses/excs/"+finicio+"/"+ffin+"/"+codigo);
  }

  regprofessor(name:string,pln:string,mln:string,user:string,passwd:string,fecha:string){
    console.log('sending');
    return this._http.post("http://localhost:4000/courses/profesor",
    {
        "nombre": name,
        "apellidoP": pln,
        "apellidoM": mln,
        "codigo":user,
        "password":passwd,
        "fechaContratacion":fecha
    }).subscribe(
      data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);  
      });
  }

  regGrupo(name:string){
    return this._http.post("http://localhost:4000/courses/grupo",
    {
        "nombre": name,
    }).subscribe(
      data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);  
      });
  }

  regMateria(name:string){
    return this._http.post("http://localhost:4000/courses/materia",
    {
        "nombre": name,
    }).subscribe(
      data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);  
      });
  }

  assign(pid:number,gid:number,mid:number,finicio:string,ffin:string,hinicio:string,hfin:string){
    console.log('sending');
    return this._http.post("http://localhost:4000/courses/asignacion",
    {
      "profesorID":pid,
      "grupoID":gid,
      "materiaID":mid,
      "fechaInicio":finicio,
      "fechaFin":ffin,
      "horaInicio":hinicio,
      "horaFin":hfin
    }).subscribe(
      data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);  
      });
  }

  regusuario(user:string,pwd:string,admin:boolean,name:string,pln:string,mln:string){
    console.log("registrando");
    return this._http.post("http://localhost:4000/admin/reg",
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
    }).subscribe(res => console.log(res.body,res.status));
  }
}