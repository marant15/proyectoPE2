import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(private _bookService: BooksService) { }

  book={
    title:'',
    autor:'',
    isbn:'',
    edition:0,
    price:0
  }

  ngOnInit() {
    var libro = localStorage.getItem('editlibro');
    this._bookService.getBook(libro).subscribe(response =>{
      this.book.title = response[0].titulo;
      this.book.autor = response[0].autor;
      this.book.isbn = response[0].isbn;
      this.book.edition = response[0].edicion;
      this.book.price = response[0].precio;
    });
  }

  edit(title:string,autor:string,isbn:string,price:string,edition:string){
    console.log(title,autor,isbn,price,edition);
  }

}
