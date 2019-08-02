import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-edit-pwd-p',
  templateUrl: './edit-pwd-p.component.html',
  styleUrls: ['./edit-pwd-p.component.css']
})
export class EditPwdPComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  pwdmatch = '';
  samepwd = false;

  ngOnInit() {
  }

  edit(oldpwd:string,newpwd:string){
    var user = localStorage.getItem('editProf');
    this._dataService.updatePpwd(user,oldpwd,newpwd);
  }

  compare(newpwd:string,repeatpwd:string){
    if(repeatpwd===newpwd && newpwd!=''){
      this.pwdmatch = '';
      this.samepwd = true;
    }else if(newpwd!=''){
      this.pwdmatch = 'Passwords NO coinciden';
      this.samepwd = false;
    }else{
      this.pwdmatch = 'Passwords NO coinciden';
      this.samepwd = false;
    }
  }
}