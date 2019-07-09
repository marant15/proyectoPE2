import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result:any;

  constructor(private _http: HttpClient){ }

  getprofesor(){
    return this._http.get("http://localhost:4000/courses/profesor");
  }

  getmateria(){
    return this._http.get("http://localhost:4000/courses/materia");
  }

  getgrupo(){
    return this._http.get("http://localhost:4000/courses/grupo");
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
}