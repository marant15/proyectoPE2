import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user = {
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    codigo: '',
    isAdmin: false,
    id:''
  }

  constructor(private _adminService: AdminService,
    private confirmationDialogService: ConfirmationDialogService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.user.codigo = localStorage.getItem('editUser');
    this._adminService.getuser(this.user.codigo).subscribe(response=>{
      this.user.id = response[0].usuarioID;
      this.user.nombre = response[0].nombre;
      this.user.apellidoP = response[0].apellidoP;
      this.user.apellidoM = response[0].apellidoM;
      this.user.isAdmin = response[0].isAdmin;
    });
  }

  edit(username:string,name:string,lastNameP:string,lastNameM:string){
    if(name && lastNameP && lastNameM && username){
      this.confirmationDialogService.confirm('Confirmacion de Usuario', 'Usuario: '+ username+" con nombre: " + name+" "+lastNameP+" "+lastNameM+ this.isAdmin())
      .then((confirmed) => {
        if (confirmed) {
          this._adminService.updateuser(this.user.id,name,this.user.isAdmin,lastNameP,lastNameM,username);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }else{
      this.toasterService.warning("Debe llenar todos los campos");
    }
  }

  isAdmin(){
    var response = ""
    if(this.user.isAdmin){
      response = ", SI es administrador";
    }else{
      response = ", NO es administrador";
    }
    return response;
  }

}
