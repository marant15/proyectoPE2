import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';
import { CoursesService } from '../services/courses.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-excepciones',
  templateUrl: './excepciones.component.html',
  styleUrls: ['./excepciones.component.css']
})
export class ExcepcionesComponent implements OnInit {
  myControl = new FormControl();
  tiempos = true;
  asignaciones = [];
  profesors = [];
  filteredOptions: Observable<string[]>;
  codes = [];

  constructor(private _coursesService: CoursesService, private _autService: AutService, private confirmationDialogService: ConfirmationDialogService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this._coursesService.getAsignaciones().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        if(response[index].estado){
          this.asignaciones.push(response[index]);
        }
      }
      console.log(this.asignaciones);
    },
    error => {
      console.log("Error", error);
    });

    this._coursesService.getprofesores().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.profesors.push(response[index]);
         this.codes.push(response[index].codigo+"-"+response[index].nombre+" "+response[index].apellidoP+" "+response[index].apellidoM);
      }
      console.log(this.profesors);
    },
    error => {
      console.log("Error", error);
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.codes.filter(option => option.toLowerCase().includes(filterValue));
  }

  checkTiempos(){
    if(!this.tiempos){
      document.getElementById("seccion").style.visibility="visible";
    }else{
      document.getElementById("seccion").style.visibility="hidden";
    }
  }

  register(assigID:number,tipo:string,fecha:Date,hora:Date){
    if(this.myControl.value){
      if(this.tiempos){
        if(fecha && hora){
          console.log(assigID,tipo,fecha,hora);
          var mi = fecha.getUTCMonth() + 1; //months from 1-12
          var di = fecha.getUTCDate();
          var yi = fecha.getUTCFullYear();
          var date = yi + "-" + mi + "-" + di;
          var houri = hora.getHours();
          var mini = hora.getUTCMinutes();
          var hour = houri+":"+mini+":00";
          var prof = this.profesors.filter(i => i.codigo === this.myControl.value.split("-",1)[0])[0];
          if(prof){
            var pid = prof.profesorID;
            this.confirmationDialogService.confirm('Confirmacion de excepcion', 'Esta seguro de guardar la excepcion?')
            .then((confirmed) => {
              console.log('User confirmed:', confirmed)
              if(confirmed){
                this._autService.excep(assigID,tipo,pid,date,hour);
              }
            })
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          }else{
            this.toasterService.error("El profesor no existe");
          }
        }else{
          this.toasterService.error("Llene todos los campos");
        }
      }else{
        var ndate = new Date();
        var mi = ndate.getUTCMonth() + 1; //months from 1-12
        var di = ndate.getUTCDate();
        var yi = ndate.getUTCFullYear();
        var date = yi + "-" + mi + "-" + di;
        var houri = ndate.getHours();
        var mini = ndate.getUTCMinutes();
        var segi = ndate.getUTCSeconds();
        var hour = houri+":"+mini+":"+segi;
        var prof = this.profesors.filter(i => i.codigo === this.myControl.value.split("-",1)[0])[0];
        if(prof){
          var pid = prof.profesorID;
          this.confirmationDialogService.confirm('Confirmacion de excepcion', 'Esta seguro de guardar la excepcion?')
          .then((confirmed) => {
            console.log('User confirmed:', confirmed)
            if(confirmed){
              this._autService.excep(assigID,tipo,pid,date,hour);
            }
          })
          .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
        }else{
          this.toasterService.error("El profesor no existe");
        }
      }
    }else{
      this.toasterService.error("Llene todos los campos");
    }
  }

}
