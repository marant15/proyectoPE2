import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-book',
  templateUrl: './select-book.component.html',
  styleUrls: ['./select-book.component.css']
})
export class SelectBookComponent implements OnInit {

  books = [];

  constructor(private _bookService: BooksService, private myRoute: Router) { }

  ngOnInit() {
    console.log("Hello");
    this._bookService.getBooks().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        this.books.push(response[index]);
      }
      console.log("Libros", this.books);
    },
    error => {
      console.log("Error", error);
    });
  }

  edit(libro:string){
    localStorage.setItem('editlibro', libro);
    this.myRoute.navigate(["editB"]);
  }

}
