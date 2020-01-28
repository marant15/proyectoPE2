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
  fechan:Date;
  constructor(private _coursesService: CoursesService, private confirmationDialogService: ConfirmationDialogService, private toasterService: ToasterService) { }

  profesor = {
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    codigo: '',
    id:'',
  }

  ngOnInit() {
    
    this.profesor.id = localStorage.getItem('editProf');
    this._coursesService.getprofesor(this.profesor.id).subscribe(response=>{
      
      this.profesor.codigo = response[0].codigo;
      this.profesor.nombre = response[0].nombre;
      this.profesor.apellidoP = response[0].apellidoP;
      this.profesor.apellidoM = response[0].apellidoM;
      this.fechan=new Date(response[0].fechaContratacion);
    });
  }

  edit(){
    if(this.profesor.nombre && this.profesor.apellidoP && this.profesor.apellidoM && this.profesor.codigo && this.fechan){
      var month = this.fechan.getUTCMonth() + 1; //months from 1-12
      var day = this.fechan.getUTCDate();
      var year = this.fechan.getUTCFullYear();
      var newdate = year + "-" + month + "-" + day + " 00:00:00";
      this.confirmationDialogService.confirm('Confirmacion de Edicion', 'Profesor: ' + this.profesor.nombre+" "+this.profesor.apellidoP+" "+this.profesor.apellidoM+" con usuario: "+this.profesor.codigo +" y fecha contratacion: "+newdate.substr(0,9))
      .then((confirmed) => {
        if (confirmed) {
          this._coursesService.updateprofesor(this.profesor.id,this.profesor.nombre,this.profesor.apellidoP,this.profesor.apellidoM,this.profesor.codigo,newdate);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }else{
      this.toasterService.warning("Debe llenar todos los campos");
    }    
  }

}
