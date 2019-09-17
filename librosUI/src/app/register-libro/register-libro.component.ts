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

  exist:boolean = false;
  constructor(private _bookService: BooksService, private toasterService: ToasterService, private myRoute: Router) { }

  ngOnInit() {
  }

  register(title:string, autor:string,isbn:string,price:string,edition:string,quantity:string){
    if(title && autor && isbn && price && edition && quantity){
      console.log(title,autor,isbn,price,edition,quantity);
      this._bookService.regbook(title,autor,isbn,edition,price,quantity);
    }else{
      this.toasterService.error("Llena todos los datos");
    }
  }

  check(isbn:string,quantity:string){
    if(isbn && quantity){
      this._bookService.getBisbn(isbn).subscribe(response =>{
        var count = Object.keys(response).length;
        if(count===0){
          this.exist = true;
        }else{
          
          console.log("Existe libro");
        }        
      },
      error => {
        console.log("Error", error);
      });
      //
    }
  }

  edit(){
    this.myRoute.navigate(["selectB"]);
  }

}
