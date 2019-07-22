import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-edit-asig',
  templateUrl: './edit-asig.component.html',
  styleUrls: ['./edit-asig.component.css']
})
export class EditAsigComponent implements OnInit {

  profesors = [];
  materias = [];
  grupos = []; 
  isActive:boolean=false;
  oAsig=[];
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    var nasig = localStorage.getItem('editAsig');
    this._dataService.getAsignacion(nasig).subscribe(response => {
      this.oAsig.push(response[0]);
    },
    error => {
      console.log("Error", error);
    });

    this._dataService.getprofesor().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.profesors.push(response[index]);
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
  }

  register(pid:number,mid:number,gid:number,fi:Date,hi:Date,ff:Date,hf:Date) {
    var nasig = localStorage.getItem('editAsig');
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

    console.log(nasig,pid,gid,mid,this.isActive);
    console.log(datei,datef,ihour,fhour);
    this._dataService.updateAsig(nasig,pid,gid,mid,this.isActive,datei,datef,ihour,fhour);
    //this._dataService.assign(pid,gid,mid,datei,datef,ihour,fhour);
  }
}
