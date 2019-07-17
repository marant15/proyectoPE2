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
  firmas = [];

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

  getData(profID:string,salary:number,finicio:Date,ffin:Date){
    this.registros = [];
    this.firmas = [];
    var mi = finicio.getUTCMonth() + 1; //months from 1-12
    var di = finicio.getUTCDate();
    var yi = finicio.getUTCFullYear();
    var datei = yi + "-" + mi + "-" + di;
    var mf = ffin.getUTCMonth() + 1; //months from 1-12
    var df = ffin.getUTCDate();
    var yf = ffin.getUTCFullYear();
    var datef = yf + "-" + mf + "-" + df;

    this._dataService.getfirmas(datei,datef,profID).subscribe(response =>{
      var count = Object.keys(response).length;
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
    });
  }

  fillingRegistros(salary:number){
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
    console.log(this.registros);
    this.calculatingSalary(salary);
  }

  calculatingSalary(salary:number){
    for(let reg of this.registros){
      reg.total = reg.nfirmas * salary;
    }
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
