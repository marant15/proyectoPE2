import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import config from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _http: HttpClient, private myRoute: Router, private toasterService: ToasterService) { }

  getBooks(){
    return this._http.get("http://"+config.hostServer+":4000/books/book");
  }

  getBook(id:string){
    return this._http.get("http://"+config.hostServer+":4000/books/book/"+id);
  }

  getBisbn(isbn:string){
    return this._http.get("http://"+config.hostServer+":4000/books/bookisbn/"+isbn);
  }

  regbook(title:string,autor:string,isbn:string,edition:string,price:string,quantity:string){
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
        this.createStock(isbn,quantity);
      }else{
        this.toasterService.error("codigo repetido")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  editBook(id:string,title:string,autor:string,isbn:string,edition:string,price:string){
    return this._http.put("http://"+config.hostServer+":4000/books/book/"+id,
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
      if(res.body === "updated"){
        this.toasterService.success("Libro Editado Correctamente");
        this.myRoute.navigate(["register"]);
      }else{
        this.toasterService.error("No se pudo realizar")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  getStock(id:string){
    return this._http.get("http://"+config.hostServer+":4000/books/stock/"+id);
  }

  stock(id:string,quantity:string){
    return this._http.post("http://"+config.hostServer+":4000/books/stock",
    {
        "libroID": id,
        "cantidad": quantity
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.body === "saved"){
        this.toasterService.success("Se ha generado el Stock");
        this.myRoute.navigate(["register"]);
      }else{
        this.toasterService.error("No se pudo generar el stock")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  createStock(isbn:string,quantity:string){
    this.getBisbn(isbn).subscribe(response =>{
      var id = response[0].libroID;
      this.stock(id,quantity);
    },
    error => {
      console.log("Error", error);
    });
  }

  editStock(libroID:string,quantity:string){
    return this._http.put("http://"+config.hostServer+":4000/books/stock/"+libroID,
    {
        "libroID": libroID,
        "cantidad": quantity
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      if(res.body === "updated"){
        this.toasterService.success("Stock Actualizado correctamente");
        this.myRoute.navigate(["register"]);
      }else{
        this.toasterService.error("No se pudo realizar")
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  sell(fecha:string,hora:string,total:string,soldbooks:any[]){
    console.log(soldbooks);
    return this._http.post("http://"+config.hostServer+":4000/books/sell",
    {
        "fecha": fecha,
        "hora":hora,
        "total": total
    },
    {
      observe:'response'
    }).subscribe(res => {
      var id = res.body[0].ventaID;
      for (let soldBook of soldbooks) {
        this.detail(soldBook,id);
      }
    },
    error  => {
      console.log("Error", error);  
    });
  }

  detail(soldbook:any,ventaID:string){
    return this._http.post("http://"+config.hostServer+":4000/books/detail",
    {
      "libroID":soldbook.libroID,
      "ventaID":ventaID,
      "cantidad": soldbook.cantidad
    },
    {
      responseType: 'text',
      observe:'response'
    }).subscribe(res => {
      console.log(res);
    },
    error  => {
      console.log("Error", error);  
    });
  }
}
