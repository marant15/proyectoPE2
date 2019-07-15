import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  register(username:string, password:string){
    var date = new Date();
    var mi = date.getUTCMonth() + 1; //months from 1-12
    var di = date.getUTCDate();
    var yi = date.getUTCFullYear();
    var datei = yi + "-" + mi + "-" + di;
    var houri = date.getHours();
    var mini = date.getUTCMinutes();
    var segi = date.getUTCSeconds();
    var ihour = houri+":"+mini+":"+segi;
    this._dataService.entry(username,password,datei,ihour);
  }

}
