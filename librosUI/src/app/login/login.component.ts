import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _autService: AutService) { }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  logIn(user:string, pass:string) {
    this._autService.login(user,pass);
  }

}
