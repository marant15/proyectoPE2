import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-edit-pwd-u',
  templateUrl: './edit-pwd-u.component.html',
  styleUrls: ['./edit-pwd-u.component.css']
})
export class EditPwdUComponent implements OnInit {

  pwdmatch = '';
  samepwd = false;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  edit(oldpwd:string,newpwd:string){
    var user = localStorage.getItem('editUser');
    this._dataService.updateUpwd(user,oldpwd,newpwd);
  }

  compare(newpwd:string,repeatpwd:string){
    if(repeatpwd===newpwd && newpwd!=''){
      this.pwdmatch = '';
      this.samepwd = true;
    }else if(newpwd===''){
      this.pwdmatch = 'Password Vacio';
      this.samepwd = false;
    }else{
      this.pwdmatch = 'Passwords NO coinciden';
      this.samepwd = false;
    }
  }

}
