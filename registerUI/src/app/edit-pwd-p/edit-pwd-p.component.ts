import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-edit-pwd-p',
  templateUrl: './edit-pwd-p.component.html',
  styleUrls: ['./edit-pwd-p.component.css']
})
export class EditPwdPComponent implements OnInit {

  constructor(private _autService: AutService, private toasterService: ToasterService) { }

  pwdmatch = '';
  samepwd = false;

  ngOnInit() {
  }

  edit(oldpwd:string,newpwd:string,repeatpwd:string){
    var user = localStorage.getItem('editProf');
    if(newpwd && repeatpwd){
      if(newpwd===repeatpwd){
        this._autService.updatePpwd(user,oldpwd,newpwd);
      }else{
        this.toasterService.warning("Passwords no coinciden");
      }
    }else{
      this.toasterService.warning("LLene todos los datos");
    }
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