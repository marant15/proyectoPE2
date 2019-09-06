import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-edit-pwd-u',
  templateUrl: './edit-pwd-u.component.html',
  styleUrls: ['./edit-pwd-u.component.css']
})
export class EditPwdUComponent implements OnInit {

  constructor(private _autService: AutService, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  edit(oldpwd:string,newpwd:string,repeatpwd:string){
    var user = localStorage.getItem('editUser');
    if(newpwd && repeatpwd){
      if(newpwd===repeatpwd){
        this._autService.updateUpwd(user,oldpwd,newpwd);
      }else{
        this.toasterService.warning("Passwords no coinciden");
      }
    }else{
      this.toasterService.warning("LLene todos los datos");
    }
    
  }
}
