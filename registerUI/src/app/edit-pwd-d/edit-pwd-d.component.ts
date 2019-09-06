import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';
import { Router } from '@angular/router';
import config from '../../assets/config.json';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-edit-pwd-d',
  templateUrl: './edit-pwd-d.component.html',
  styleUrls: ['./edit-pwd-d.component.css']
})
export class EditPwdDComponent implements OnInit {

  constructor(private _autService: AutService, private myRoute: Router, private toasterService: ToasterService) { }

  ngOnInit() {
    var user = localStorage.getItem('codigo');
    if(user===null){
      this.myRoute.navigate(["register"]);
    }
  }

  edit(newpwd:string, repeatpwd:string){
    var tipo = localStorage.getItem('tipo');
    var user = localStorage.getItem('codigo');
    if(newpwd && repeatpwd){
      if(newpwd===repeatpwd){
        if (tipo=='usuario'){
          this._autService.updateUpwd(user,config.defaultPassword,newpwd);
        }else{
          this._autService.updatePpwd(user,config.defaultPassword,newpwd);
          this.toasterService.success("registro guardado");
        }
      }else{
        this.toasterService.warning("Passwords no coinciden");
      }
    }else{
      this.toasterService.warning("LLene todos los datos");
    }
  }
}
