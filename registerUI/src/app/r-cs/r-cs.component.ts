import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'app-r-cs',
  templateUrl: './r-cs.component.html',
  styleUrls: ['./r-cs.component.css']
})
export class RCsComponent implements OnInit {

  constructor(private _coursesService: CoursesService) { }

  ngOnInit() {
  }

  registerM(name:string) {
    this._coursesService.regMateria(name);
  }

  registerG(name:string) {
    this._coursesService.regGrupo(name);
  }

}
