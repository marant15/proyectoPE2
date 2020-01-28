import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-venta-libro',
  templateUrl: './venta-libro.component.html',
  styleUrls: ['./venta-libro.component.css']
})
export class VentaLibroComponent implements OnInit {
  myControl = new FormControl();


  constructor(private _bookService: BooksService, private toasterService: ToasterService) { }
  filteredOptions: Observable<string[]>;
  isbns = [];
  books = [];
  sellBooks = [];
  ngOnInit() {
    this._bookService.getBooks().subscribe(response => {
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        this.isbns.push(response[index].isbn + "-" + response[index].titulo);
        this.books.push(response[index]);
      }
    },
      error => {
        console.log("Error", error);
      });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.isbns.filter(option => option.toLowerCase().includes(filterValue));
  }

  sellBook(cantidad: string) {
    if (cantidad && this.myControl.value) {
      var book = this.books.filter(i => i.isbn === this.myControl.value.split("-", 1)[0])[0];
      if (!(this.checking(book, cantidad))) {
        this.sellBooks.push({
          libroID: book.libroID,
          cantidad: cantidad,
          autor: book.autor,
          isbn: book.isbn,
          titulo: book.titulo,
          precio: (parseInt(cantidad) * parseInt(book.precio)) + ''
        });
      }
    } else {
      this.toasterService.error("Llene los campos necesarios");
    }
  }

  selling() {
    if (this.sellBooks.length > 0) {
      var date = new Date();
      var m = date.getUTCMonth() + 1; //months from 1-12
      var d = date.getUTCDate();
      var y = date.getUTCFullYear();
      var dates = y + "-" + m + "-" + d;
      var hour = date.getHours();
      var min = date.getUTCMinutes();
      var seg = date.getUTCSeconds();
      var hours = hour + ":" + min + ":" + seg;
      var total = this.getTotal();
      this._bookService.sell(dates, hours, total, this.sellBooks);
      this.sellBooks = [];
    } else {
      this.toasterService.error("Agregue libros para vender");
    }

  }

  getTotal() {
    var total = 0;
    for (let book of this.sellBooks) {
      total += parseInt(book.precio);
    }
    return total + "";
  }

  delete(isbn: string) {
    for (let index = 0; index < this.sellBooks.length; index++) {
      if (parseInt(isbn) == this.sellBooks[index].isbn) {
        this.sellBooks.splice(index, 1);
      }
    }
  }

  checking(book: any, cantidad: string) {
    for (let sbook of this.sellBooks) {
      if (sbook.isbn === book.isbn) {
        sbook.cantidad = (parseInt(cantidad) + parseInt(sbook.cantidad)) + "";
        sbook.precio = ((parseInt(cantidad) * parseInt(book.precio)) + parseInt(sbook.precio)) + "";
        return true;
      }
    }
    return false;
  }
}
