import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-edit-profesor',
  templateUrl: './edit-profesor.component.html',
  styleUrls: ['./edit-profesor.component.css']
})
export class EditProfesorComponent implements OnInit {

  constructor(private _coursesService: CoursesService, private confirmationDialogService: ConfirmationDialogService, private toasterService: ToasterService) { }

  profesor = {
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    codigo: '',
    fechaC: '',
    id:''
  }

  ngOnInit() {
    this.profesor.id = localStorage.getItem('editProf');
    this._coursesService.getprofesor(this.profesor.id).subscribe(response=>{
      this.profesor.codigo = response[0].codigo;
      this.profesor.nombre = response[0].nombre;
      this.profesor.apellidoP = response[0].apellidoP;
      this.profesor.apellidoM = response[0].apellidoM;
      this.profesor.fechaC = response[0].fechaContratacion;
    });
  }

  edit(name:string,lastNameP:string,lastNameM:string,username:string,fecha:Date){
    if(name && lastNameP && lastNameM && username && fecha){
      var month = fecha.getUTCMonth() + 1; //months from 1-12
      var day = fecha.getUTCDate();
      var year = fecha.getUTCFullYear();
      var newdate = year + "-" + month + "-" + day + " 00:00:00";
      this.confirmationDialogService.confirm('Confirmacion de Edicion', 'Profesor: ' + name+" "+lastNameP+" "+lastNameM+" con usuario: "+username +" y fecha contratacion: "+newdate.substr(0,9))
      .then((confirmed) => {
        if (confirmed) {
          this._coursesService.updateprofesor(this.profesor.id,name,lastNameP,lastNameM,username,newdate);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }else{
      this.toasterService.warning("Debe llenar todos los campos");
    }    
  }

}
