import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { AutService } from '../services/aut.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-select-profesor',
  templateUrl: './select-profesor.component.html',
  styleUrls: ['./select-profesor.component.css']
})
export class SelectProfesorComponent implements OnInit {

  profesors = [];

  constructor(private _coursesService: CoursesService, private myRoute: Router, private _autService: AutService
    ,private toasterService: ToasterService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this._coursesService.getprofesores().subscribe(response => {
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        this.profesors.push(response[index]);
      }
    },
      error => {
        console.log("Error", error);
      });
  }

  edit(numero: string) {
    localStorage.setItem('editProf', numero);
    this.myRoute.navigate(["editprof"]);
  }

  editpwd(numero: string) {
    localStorage.setItem('editProf', numero);
    this.myRoute.navigate(["editpwdP"]);
  }

  reset(numero: string) {
    this.confirmationDialogService.confirm("Reseteo del password", 'Seguro que quieres resetear el password')
      .then((confirmed) => {
        if (confirmed) {
          this._autService.resetPPassword(numero).subscribe(response => {
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
