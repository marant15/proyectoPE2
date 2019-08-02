import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {

  users=[];

  constructor(private _dataService: DataService, private myRoute: Router,
     private toasterService: ToasterService, private confirmationDialogService: ConfirmationDialogService) { }

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
    console.log(numero);
    this.confirmationDialogService.confirm("Reseteo del password", 'Seguro que quieres resetear el password')
      .then((confirmed) => {
        if (confirmed) {
          this._dataService.resetUPassword(numero).subscribe(response => {
            if (response.body === 'updated') {
              this.toasterService.success("El password se reseteo correctamente");
            } else {
              this.toasterService.error("No se pudo resetear el password");
            }
          });
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
