import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToasterService } from '../services/toaster.service';


@Component({
  selector: 'app-cusers',
  templateUrl: './cusers.component.html',
  styleUrls: ['./cusers.component.css']
})
export class CusersComponent implements OnInit {

  constructor(private _adminService: AdminService, private myRoute: Router,
    private confirmationDialogService: ConfirmationDialogService, private toasterService: ToasterService) { }
  isadmin = false;
  ngOnInit() {
  }

  register(user:string, pass:string,name:string,lastNameP:string,lastNameM:string){
    if(name && lastNameP && lastNameM && user && pass){
      this.confirmationDialogService.confirm('Confirmacion de Usuario', 'Usuario: '+ user+" con nombre: " + name+" "+lastNameP+" "+lastNameM+ this.isAdmin())
      .then((confirmed) => {
        if (confirmed) {
          this._adminService.regusuario(user,pass,this.isadmin,name,lastNameP,lastNameM);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }else{
      this.toasterService.warning("Debe llenar todos los campos");
    }
  }

  isAdmin(){
    var response = ""
    if(this.isadmin){
      response = ", SI es administrador";
    }else{
      response = ", NO es administrador";
    }
    return response;
  }

  edit(){
    this.myRoute.navigate(["selectuser"]);
  }

}
