import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  myControl = new FormControl();
  constructor(private _dataService: DataService, private confirmationDialogService: ConfirmationDialogService,
    private toasterService: ToasterService) { }
  filteredOptions: Observable<string[]>;

  codes = [];
  constructor(private _dataService: DataService, private myRoute: Router) { }

  profesors = [];
  materias = [];
  grupos = [];  
  ngOnInit() {
    this._dataService.getprofesor().subscribe(response =>{
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

    this._dataService.getmateria().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.materias.push(response[index]);
      }
    },
    error => {
      console.log("Error", error);
    });

    this._dataService.getgrupo().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.grupos.push(response[index]);
      }
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

  register(mid:number,gid:number,fi:Date,hi:Date,ff:Date,hf:Date) {
    if(fi && hi && ff && hf && this.myControl.value){
    var mi = fi.getUTCMonth() + 1; //months from 1-12
    var di = fi.getUTCDate();
    var yi = fi.getUTCFullYear();
    var datei = yi + "-" + mi + "-" + di;
    var houri = hi.getHours();
    var mini = hi.getUTCMinutes();
    var ihour = houri+":"+mini+":00";
    var mf = ff.getUTCMonth() + 1; //months from 1-12
    var df = ff.getUTCDate();
    var yf = ff.getUTCFullYear();
    var datef = yf + "-" + mf + "-" + df;
    var hourf = hf.getHours();
    var minf = hf.getUTCMinutes();
    var fhour = hourf+":"+minf+":00";
    var prof = this.profesors.filter(i => i.codigo === this.myControl.value.split("-",1)[0])[0];
    if(prof){
      var pid = prof.profesorID;
      this.confirmationDialogService.confirm('Confirmacion de asignacion', 'Asignacion del profesor: '+this.myControl.value+
      " para la materia: "+this.materias.filter(i => i.materiaID == mid)[0].nombre+
      " al grupo: "+this.grupos.filter(i => i.grupoID == gid)[0].nombre+" con las fechas: "+
      datei+"   "+datef+" en el periodo: "+
      ihour+" - "+fhour)
      .then((confirmed) => {
        console.log('User confirmed:', confirmed)
        if(confirmed){
          this.toasterService.success("Asignacion guardada correctamente");
          this._dataService.assign(pid,gid,mid,datei,datef,ihour,fhour);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }else{
      this.toasterService.error("El profesor no existe");
    }
  }else{
    this.toasterService.error("Llene todos los campos");
  }
  }

  edit(){
    this.myRoute.navigate(["selectasig"]);
  }

}
