import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _dataService: DataService, private myRoute: Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  logIn(user:string, pass:string) {
    this._dataService.login(user,pass);
  }

  stat(){
    console.log(this._dataService.isLoggedin());
  }

}
