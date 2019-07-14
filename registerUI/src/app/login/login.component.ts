import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  logIn(user:string, pass:string) {
    this._dataService.login(user,pass);
  }

  stat(){
    console.log(this._dataService.isLoggedin());
  }

}
