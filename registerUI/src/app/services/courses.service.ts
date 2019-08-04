import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private _http: HttpClient, private myRoute: Router, private toasterService: ToasterService) { }

  getprofesores(){
    return this._http.get("http://localhost:4000/courses/profesor");
  }

  getprofesor(codigo:string){
    return this._http.get("http://localhost:4000/courses/profesor/"+codigo);
  }

  getmateria(){
    return this._http.get("http://localhost:4000/courses/materia");
  }

  getgrupo(){
    return this._http.get("http://localhost:4000/courses/grupo");
  }

  getfirmas(fechai:string,fechaf:string,codigo:string){
    return this._http.get("http://localhost:4000/courses/registros/"+fechai+"/"+fechaf+"/"+codigo);
  }

  getexcepciones(fechai:string,fechaf:string,codigo:string){
    return this._http.get("http://localhost:4000/courses/excs/"+fechai+"/"+fechaf+"/"+codigo);
  }

  getAsignaciones(){
    return this._http.get("http://localhost:4000/courses/asignacion");
  }

  getAsignacion(id:string){
    return this._http.get("http://localhost:4000/courses/asignacion/"+id);
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
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);
      if(res.body === "saved"){
        this.toasterService.success("Profesor guardado correctamente");
      }else{
        this.toasterService.error("codigo repetido")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  regGrupo(name:string){
    return this._http.post("http://localhost:4000/courses/grupo",
    {
        "nombre": name,
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);
      if(res.body === 'saved'){
        this.toasterService.success("grupo guardado correctamente");
      }else{
        this.toasterService.error("nombre de grupo repetido")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  regMateria(name:string){
    return this._http.post("http://localhost:4000/courses/materia",
    {
        "nombre": name,
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);
      if(res.body === 'saved'){
        this.toasterService.success("Materia guardada correctamente");
      }else{
        this.toasterService.error("Nombre de materia repetido")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  assign(pid:number,gid:number,mid:number,finicio:string,ffin:string,hinicio:string,hfin:string){
    return this._http.post("http://localhost:4000/courses/asignacion",
    {
      "profesorID":pid,
      "grupoID":gid,
      "materiaID":mid,
      "fechaInicio":finicio,
      "fechaFin":ffin,
      "horaInicio":hinicio,
      "horaFin":hfin,
      "estado":true
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);
      this.toasterService.success("Asignacion guardada correctamente");
    },
    error  => {
      console.log("Error", error);  
    });
  }

  updateAsig(aID,pid:number,gid:number,mid:number,estado:boolean,finicio:string,ffin:string,hinicio:string,hfin:string){
    return this._http.put("http://localhost:4000/courses/asignacion/"+aID,{
      "profesorID":pid,
      "grupoID":gid,
      "materiaID":mid,
      "fechaInicio":finicio,
      "fechaFin":ffin,
      "horaInicio":hinicio,
      "horaFin":hfin,
      "estado":estado
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);
      if(res.body === 'updated'){
        this.toasterService.success("Asignacion editada correctamente");
        this.myRoute.navigate(["rprofesor"]);

      }else{
        this.toasterService.error("No se pudo actualizar la asignacion")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  updateprofesor(pid:string,name:string,pln:string,mln:string,user:string,fecha:string){
    return this._http.put("http://localhost:4000/courses/profesor/"+pid,{
      "nombre": name,
      "apellidoP": pln,
      "apellidoM": mln,
      "codigo":user,
      "fechaContratacion":fecha
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res.body,res.status);
      if(res.body === 'updated'){
        this.toasterService.success("Profesor editado correctamente");
        this.myRoute.navigate(["rprofesor"]);
      }else{
        this.toasterService.error("No se pudo actualizar el profesor")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }
}