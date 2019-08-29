import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToasterService } from '../services/toaster.service';


@Component({
  selector: 'app-r-cs',
  templateUrl: './r-cs.component.html',
  styleUrls: ['./r-cs.component.css']
})
export class RCsComponent implements OnInit {

  constructor(private _coursesService: CoursesService, private confirmationDialogService: ConfirmationDialogService, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  registerM(name:string) {
    if(name!=""){
      this.confirmationDialogService.confirm('Confirmacion de Materia', 'Nombre Materia: ' + name)
          .then((confirmed) => {
            if (confirmed) {
              this._coursesService.regMateria(name);
            }
          })
          .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }else{
      this.toasterService.warning("Debe llenar el campo de materia");
    }
  }

  registerG(name:string) {
    if(name!=""){
      this.confirmationDialogService.confirm('Confirmacion de Grupo', 'Nombre Grupo: ' + name)
          .then((confirmed) => {
            if (confirmed) {
              this._coursesService.regGrupo(name);
            }
          })
          .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }else{
      this.toasterService.warning("Debe llenar el campo de Grupo");
    }
  }

}
