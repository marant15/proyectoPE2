import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from './services/toaster.service'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //@ViewChild(Ng2PopupComponent) popup: Ng2PopupComponent;
  islogged:boolean = false;

  result:any;

  constructor(private _http: HttpClient, private myRoute: Router, private toasterService: ToasterService){ }

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
    },
    error  => {
      console.log("Error", error);
      if(error.status==400){
        this.toasterService.error("Password o usuario incorrecto");
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
      if(res.body==="no existe asignacion"){
        this.toasterService.info("No existe una asignacion en el horario actual");
      }else if(res.body.split(" ")[0]==="ya"){
        this.toasterService.warning("Ya existe un registro para este horario");
      }else{
        this.toasterService.success("registro guardado");
      }
    },
    error  => {
      console.log("Error", error);
      if(error.status==400){
        this.toasterService.error("Password o usuario incorrecto");
      } 
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

  excep(assig:number,tipo:string,pid:number,fecha:string,tiempo:string){
    return this._http.post("http://localhost:4000/aut/exc",
    {
      "asignacionID":assig,
      "tipo":tipo,
      "professorID":pid,
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
    }).subscribe(res => {
      console.log(res.body,res.status);
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
}