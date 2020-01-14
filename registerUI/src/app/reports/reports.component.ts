import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { ToasterService } from '../services/toaster.service';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { ImageDialogService } from '../imageDialog/imageDialog.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  fechai: Date;
  fechaf: Date;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  reporteActivo = false;
  profesors = [];
  registros = [];
  codes = [];

  constructor(private _coursesService: CoursesService, private excelService: ExcelService,
    private imageDialogService: ImageDialogService, private toaterservice: ToasterService) { }

  ngOnInit() {
    this._coursesService.getprofesores().subscribe(response => {
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        this.profesors.push(response[index]);
        this.codes.push(response[index].codigo + "-" + response[index].nombre + " " + response[index].apellidoP + " " + response[index].apellidoM);
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

  getData() {
    if (this.fechaf && this.fechai && this.myControl.value) {
      this.registros = [];
      var mi = this.fechai.getUTCMonth() + 1; //months from 1-12
      var di = this.fechai.getUTCDate();
      var yi = this.fechai.getUTCFullYear();
      var datei = yi + "-" + mi + "-" + di;
      var mf = this.fechaf.getUTCMonth() + 1; //months from 1-12
      var df = this.fechaf.getUTCDate();
      var yf = this.fechaf.getUTCFullYear();
      var datef = yf + "-" + mf + "-" + df;
      var prof = this.profesors.filter(i => i.codigo === this.myControl.value.split("-", 1)[0])[0];
      if (prof) {
        var profID = prof.codigo;
        this.fillasignaciones(datei, datef, profID);
      }
    }else{
      this.toaterservice.error("Llene todos los campos para obtener resultados");
    }
  }

  fillasignaciones(fi: string, ff: string, profID: string) {
    this._coursesService.getfirmas(fi, ff, profID).subscribe(response => {
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        var dateE = new Date(response[index].fechaRegistro.substr(0, 10) + " " + response[index].fechaRegistro.substr(11, 8));
        var hourE = this.convertHours(dateE);
        var di = response[index].fechaRegistro.substr(0, 10) + " " + response[index].horaInicio;
        this.registros.push({
          "id": response[index].registroID,
          "grupo": response[index].grupo,
          "materia": response[index].materia,
          "fecha": response[index].fechaRegistro.substr(0, 10),
          "hora": hourE,
          "inicio": response[index].horaInicio,
          "estado": this.atraso(di, dateE),
          "tipo": 'Reg'
        });
      }
      this.fillexcepciones(fi, ff, profID);
    },
      error => {
        console.log("Error", error);
      });
  }

  fillexcepciones(fi: string, ff: string, profID: string) {
    this._coursesService.getexcepciones(fi, ff, profID).subscribe(response => {
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        var dateE = new Date(response[index].fechaExcepcion.substr(0, 10) + " " + response[index].fechaExcepcion.substr(11, 8));
        var hourE = this.convertHours(dateE);
        var di = response[index].fechaExcepcion.substr(0, 10) + " " + response[index].horaInicio;
        this.registros.push({
          "grupo": response[index].grupo,
          "materia": response[index].materia,
          "fecha": response[index].fechaExcepcion.substr(0, 10),
          "hora": hourE,
          "inicio": response[index].horaInicio,
          "estado": this.atraso(di, dateE),
          "tipo": response[index].tipo
        });
      }
      this.reporteActivo = true;
    },
      error => {
        console.log("Error", error);
      });
  }

  convertHours(date: Date) {
    date.setTime(date.getTime() - (4 * 3600 * 1000));
    var hour = date.getHours();
    var min = date.getUTCMinutes();
    var rhour = hour + ":" + min + ":00";
    return rhour;
  }

  atraso(di: string, dr: Date) {
    var dini = new Date(di);
    dini.setTime(dini.getTime() + (15 * 60 * 1000));
    if (dini < dr) {
      return "Retraso"
    }
    return "A tiempo"
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.registros, 'sample');
  }

  success() {
    this.toaterservice.success("success")
  }

  warning() {
    this.toaterservice.warning("warning")
  }

  info() {
    this.toaterservice.info("info")
  }

  error() {
    this.toaterservice.error("error")
  }

  showImage(id: String) {
    this.imageDialogService.confirm('Imagen', '' + id)
      .then((confirmed) => {
        console.log('User confirmed:', confirmed)
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
