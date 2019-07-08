import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result:any;

  constructor(private _http: HttpClient){ }

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
}