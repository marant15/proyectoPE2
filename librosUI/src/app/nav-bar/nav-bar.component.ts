import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(private _bookService: BooksService) { }

  ngOnInit() {
  }

  isLogged(){
    return this._bookService.isLoggedin();
  }

  logout(){
    this._bookService.logout();
  }

}
