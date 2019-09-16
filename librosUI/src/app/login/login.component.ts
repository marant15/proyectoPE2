import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _bookService: BooksService) { }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  logIn(user:string, pass:string) {
    this._bookService.login(user,pass);
  }

}
