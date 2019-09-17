import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-libro',
  templateUrl: './register-libro.component.html',
  styleUrls: ['./register-libro.component.css']
})
export class RegisterLibroComponent implements OnInit {

  constructor(private _bookService: BooksService, private toasterService: ToasterService, private myRoute: Router) { }

  ngOnInit() {
  }

  register(title:string, autor:string,isbn:string,price:string,edition:string){
    if(title && autor && isbn && price && edition){
      console.log(title,autor,isbn,price,edition);
      this._bookService.regbook(title,autor,isbn,edition,price);
    }else{
      this.toasterService.error("Llena todos los datos");
    }
  }

  edit(){
    this.myRoute.navigate(["selectB"]);
  }

}
