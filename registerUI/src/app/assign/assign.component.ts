import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  myControl = new FormControl();
  constructor(private _dataService: DataService) { }
  filteredOptions: Observable<string[]>;

  codes = [];
  profesors = [];
  materias = [];
  grupos = [];  
  ngOnInit() {
    this._dataService.getprofesor().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.profesors.push(response[index]);
         this.codes.push(response[index].codigo);
      }
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
    var pid = this.profesors.filter(i => i.codigo === this.myControl.value)[0].profesorID;
    this._dataService.assign(pid,gid,mid,datei,datef,ihour,fhour);
  }

}
