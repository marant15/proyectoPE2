import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import config from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _http: HttpClient, private toasterService: ToasterService) { }

  getBooks(){
    return this._http.get("http://"+config.hostServer+":4000/books/book");
  }

  getBook(id:string){
    return this._http.get("http://"+config.hostServer+":4000/books/book/"+id);
  }

  regbook(title:string,autor:string,isbn:string,edition:string,price:string){
    return this._http.post("http://"+config.hostServer+":4000/books/book",
    {
        "titulo": title,
        "autor": autor,
        "isbn": isbn,
        "edicion": edition,
        "precio": price
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.body === "saved"){
        this.toasterService.success("Libro Guardado Correctamente");
      }else{
        this.toasterService.error("codigo repetido")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }
}
