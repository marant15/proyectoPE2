import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-edit-pwd-p',
  templateUrl: './edit-pwd-p.component.html',
  styleUrls: ['./edit-pwd-p.component.css']
})
export class EditPwdPComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  change(oldpwd:string,newpwd:string){
    var user = localStorage.getItem('editProf');
    this._dataService.updatePpwd(user,oldpwd,newpwd);
  }
}
