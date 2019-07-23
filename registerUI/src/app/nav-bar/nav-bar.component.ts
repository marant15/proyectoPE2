import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  isadmin = false;

  ngOnInit() {
    this._dataService.isadmin().subscribe(response=>{
      if(response[0].isAdmin===1){
        this.isadmin = true;
      }else{
        this.isadmin = false;
      }
    })
  }

  logout(){
    this._dataService.logout();
  }
}
