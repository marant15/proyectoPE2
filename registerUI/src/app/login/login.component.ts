import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }
  clickMessage = '';
  counter = 1;

  logIn(user, pass) {
    //this._dataService.attendance(user,pass);
    console.log(user);
    this.counter++;
  }

}
