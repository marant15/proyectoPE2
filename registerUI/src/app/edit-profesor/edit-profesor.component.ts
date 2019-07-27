import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-edit-profesor',
  templateUrl: './edit-profesor.component.html',
  styleUrls: ['./edit-profesor.component.css']
})
export class EditProfesorComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  profesor = {
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    codigo: '',
    fechaC: '',
    id:''
  }

  ngOnInit() {
    this.profesor.id = localStorage.getItem('editProf');
    console.log(localStorage.getItem('editProf'));
    this._dataService.getprofesor(this.profesor.id).subscribe(response=>{
      console.log(response);
      this.profesor.codigo = response[0].codigo;
      this.profesor.nombre = response[0].nombre;
      this.profesor.apellidoP = response[0].apellidoP;
      this.profesor.apellidoM = response[0].apellidoM;
      this.profesor.fechaC = response[0].fechaContratacion;
    });
  }

  edit(name:string,lastNameP:string,lastNameM:string,username:string,fecha:Date){
    var month = fecha.getUTCMonth() + 1; //months from 1-12
    var day = fecha.getUTCDate();
    var year = fecha.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day + " 00:00:00";
    this._dataService.updateprofesor(this.profesor.id,name,lastNameP,lastNameM,username,newdate);
  }

}
