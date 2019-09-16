import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-register-libro',
  templateUrl: './register-libro.component.html',
  styleUrls: ['./register-libro.component.css']
})
export class RegisterLibroComponent implements OnInit {

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
  }

  register(title:string, autor:string,isbn:string,price:string,edition:string){
    if(title && autor && isbn && price && edition){
      console.log(title,autor,isbn,price,edition);
    }else{
      this.toasterService.error("Llena todos los datos");
    }
  }

}
