import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../services/excel.service';
import { ToasterService } from '../services/toaster.service';
import { DataService } from '../http.service';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reporteActivo = false;
  profesors = [];
  registros = [];
  meses = [
    {"month":"Enero", "value":1},{"month":"Febrero", "value":2},{"month":"Marzo", "value":3},
    {"month":"Abril", "value":4},{"month":"Mayo", "value":5},{"month":"Junio", "value":6},
    {"month":"Julio", "value":7},{"month":"Agosto", "value":8},{"month":"Septiembre", "value":9},
    {"month":"Octubre", "value":10},{"month":"Noviembre", "value":11},{"month":"Diciembre", "value":12},
  ]

  constructor(private _dataService: DataService,private excelService:ExcelService, private toaterservice:ToasterService){}
  ngOnInit() {
    this._dataService.getprofesores().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.profesors.push(response[index]);
      }
    },
    error => {
      console.log("Error", error);
    });
  }

  getData(profID:string,mes:string){
    this.fillasignaciones(mes,profID);
    /*this._dataService.entry("7891011","7891011","2019-07-01","11:05:00","");
    this._dataService.entry("7891011","7891011","2019-07-02","10:55:00","");
    this._dataService.entry("7891011","7891011","2019-07-03","11:01:00","");
    this._dataService.entry("7891011","7891011","2019-07-04","10:58:00","");

    this._dataService.getfirmas(profID).subscribe(response =>{
      var count = Object.keys(response).length;
      console.log(response);
      for (let index = 0; index < count; index++) {
         this.firmas.push(response[index]);
      }
      
      if(this.firmas.length>0){
        this.fillingRegistros(salary);
        this.reporteActivo = true;
      }
    },
    error => {
      console.log("Error", error);
    });*/
  }

  fillasignaciones(mes:string,profID:string){
    this._dataService.getfirmas(mes,profID).subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        var dateE = new Date(response[index].fechaRegistro.substr(0,10)+" "+response[index].fechaRegistro.substr(11,8));
        var hourE = this.convertHours(dateE);
        var di = response[index].fechaRegistro.substr(0,10)+" "+response[index].horaInicio;
        this.registros.push({
         "grupo": response[index].grupo,
         "materia": response[index].materia,
         "fecha":response[index].fechaRegistro.substr(0,10),
         "hora":hourE,
         "inicio":response[index].horaInicio,
         "estado": this.atraso(di,dateE),
         "tipo":'Reg'
        });
      }
      this.fillexcepciones(mes,profID);
    },
    error => {
      console.log("Error", error);
    });
  }

  fillexcepciones(mes:string,profID:string){
    this._dataService.getexcepciones(mes,profID).subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        var dateE = new Date(response[index].fechaExcepcion.substr(0,10)+" "+response[index].fechaExcepcion.substr(11,8));
        var hourE = this.convertHours(dateE);
        var di = response[index].fechaExcepcion.substr(0,10)+" "+response[index].horaInicio;
        this.registros.push({
         "grupo": response[index].grupo,
         "materia": response[index].materia,
         "fecha":response[index].fechaExcepcion.substr(0,10),
         "hora":hourE,
         "inicio":response[index].horaInicio,
         "estado": this.atraso(di,dateE),
         "tipo":response[index].tipo
        });
      }
      this.reporteActivo = true;
    },
    error => {
      console.log("Error", error);
    });
  }

  convertHours(date:Date){
    date.setTime(date.getTime()-(4*3600*1000));
    var hour = date.getHours();
    var min = date.getUTCMinutes();
    var rhour = hour+":"+min+":00";
    return rhour;
  }

  atraso(di:string,dr:Date){
    var dini = new Date(di);
    dini.setTime(dini.getTime()+(15*60*1000));
    if(dini<dr){
      return "Retraso"
    }
    return "A tiempo"
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.registros, 'sample');
  }

  success(){
    this.toaterservice.success("success")
  }

  warning(){
    this.toaterservice.warning("warning")
  }

  info(){
    this.toaterservice.info("info")
  }

  error(){
    this.toaterservice.error("error")
  }

}
