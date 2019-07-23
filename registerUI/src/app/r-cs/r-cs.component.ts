import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';


@Component({
  selector: 'app-r-cs',
  templateUrl: './r-cs.component.html',
  styleUrls: ['./r-cs.component.css']
})
export class RCsComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  registerM(name:string) {
    this._dataService.regMateria(name);
  }

  registerG(name:string) {
    this._dataService.regGrupo(name);
  }

}
