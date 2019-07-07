import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: HttpClient){ }

  registerUser(){

  }

  attendance(user,passwd){
      return this._http.post("http://localhost:4000",{"username":user,"password":passwd});
  }

}