import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {

  users=[];

  constructor(private _dataService: DataService, private myRoute: Router) { }

  ngOnInit() {
    this._dataService.getusers().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        this.users.push(response[index]);
      }
      console.log(this.users);
    },
    error => {
      console.log("Error", error);
    });
  }

  edit(numero:string){
    localStorage.setItem('editUser', numero);
    this.myRoute.navigate(["edituser"]);
  }

  editpwd(numero:string){
    localStorage.setItem('editUser', numero);
    this.myRoute.navigate(["editpwdU"]);
  }

  reset(numero:string){

  }

}
