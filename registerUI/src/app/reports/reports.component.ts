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
  //en data se ponen los datos para la tabla (contenido de pagos de un profesor en un determinado mes)
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
    this._dataService.getprofesor().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.profesors.push(response[index]);
      }
    },
    error => {
      console.log("Error", error);
    });
  }

  /*
 {
    grupo: "a",
    materia: "Fisica",
    nfirmas: 10,
    total: nfirmas * $pagofirma 
  }
  */

  getData(profID:string,mes:string){

    console.log(profID,mes);
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
      console.log(response);
      for (let index = 0; index < count; index++) {
        var dateE = new Date(response[index].fechaRegistro.substr(0,10)+" "+response[index].fechaRegistro.substr(11,8));        
        console.log(dateE);
        var dateI = new Date(response[index].fechaInicio.substr(0,10)+" "+response[index].horaInicio);
        console.log(dateI);
        this.registros.push({
         "grupo": response[index].grupo,
         "materia": response[index].materia,
         "fecha":response[index].fechaRegistro.substr(0,10),
         "hora":response[index].fechaRegistro.substr(11,5),
         "tipo":'Reg'
        });
      }
      console.log(this.registros);
      this.reporteActivo = true;
      //this.fillexcepciones();
    },
    error => {
      console.log("Error", error);
    });
  }

  fillexcepciones(){

  }

  /*fillingRegistros(salary:number){
    if(this.registros.length<1){
      this.registros.push({
        grupo:this.firmas[0].grupo,
        materia:this.firmas[0].materia,
        nfirmas:0,
        total:0
      });
    }
    this.calculatingfirmas(salary);
    
  }

  calculatingfirmas(salary:number){
    for(let firma of this.firmas){
      var existe = false;
      for(let registro of this.registros){
        if(firma.grupo==registro.grupo){
          if(firma.materia==registro.materia){
            registro.nfirmas= registro.nfirmas+1;
            existe = true;
            break;
          }
        }
      }
      if(!existe){
        this.registros.push({
          grupo:firma.grupo,
          materia:firma.materia,
          nfirmas:1,
          total:0
        });
      }
    }
    this.calculatingSalary(salary);
  }

  calculatingSalary(salary:number){
    for(let reg of this.registros){
      reg.total = reg.nfirmas * salary;
    }
  }

  datecompare(dateE:Date,dateI:Date){
    if( > Date.parse('01/01/2011 5:10:10')){
      console.log('true');
    }else{
      console.log('false')
    }
  }*/

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
