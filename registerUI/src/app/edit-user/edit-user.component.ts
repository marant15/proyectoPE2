import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

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

  constructor(private _adminService: AdminService) { }

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
    console.log(name,this.user.isAdmin,username,lastNameP,lastNameM);
    this._adminService.updateuser(this.user.id,name,this.user.isAdmin,lastNameP,lastNameM,username);
  }

}
