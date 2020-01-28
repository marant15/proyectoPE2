import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(private _autService: AutService) { }

  ngOnInit() {
  }

  isLogged(){
    return this._autService.isLoggedin();
  }

  logout(){
    this._autService.logout();
  }

}
