import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../services/excel.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  name = 'Angular 6';
  //en data se ponen los datos para la tabla (contenido de pagos de un profesor en un determinado mes)
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
  constructor(private excelService:ExcelService){

  }
  ngOnInit() {
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }

}
