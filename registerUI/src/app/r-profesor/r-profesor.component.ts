import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToasterService } from '../services/toaster.service';


@Component({
  selector: 'app-r-profesor',
  templateUrl: './r-profesor.component.html',
  styleUrls: ['./r-profesor.component.css']
})
export class RProfesorComponent implements OnInit {

  date: Date = new Date();
  
  constructor(private _coursesService: CoursesService, private myRoute: Router,
    private confirmationDialogService: ConfirmationDialogService, private toasterService: ToasterService) { }

  ngOnInit() {
    
  }


  register(name:string,lastNameP:string,lastNameM:string,user:string, pass:string, fecha:Date) {
    if(name && lastNameP && lastNameM && user && pass && fecha){
      var month = fecha.getUTCMonth() + 1; //months from 1-12
      var day = fecha.getUTCDate();
      var year = fecha.getUTCFullYear();
      var newdate = year + "-" + month + "-" + day + " 00:00:00";
      this.confirmationDialogService.confirm('Confirmacion de Profesor', 'Profesor: ' + name+" "+lastNameP+" "+lastNameM+" con usuario: "+user +" y fecha contratacion: "+newdate.substr(0,9))
      .then((confirmed) => {
        if (confirmed) {
          this._coursesService.regprofessor(name,lastNameP,lastNameM,user,pass,newdate);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }else{
      this.toasterService.warning("Debe llenar todos los campos");
    }
  }

  edit(){
    this.myRoute.navigate(["selectprof"]);
  }

}
