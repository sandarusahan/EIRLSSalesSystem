import { Courier } from './../Models/Courier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  url = "http://localhost:8080/courier/"
  // url = "https://sales-app-saho.herokuapp.com/courier/"
  constructor(private http:HttpClient) { }

  getAllCouriers(){
    return this.http.get<Courier[]>(this.url+"all");
  }

  getCourier(id:string){
    return this.http.get<Courier>(this.url+id);
  }

  addNewCourier(courier:Courier) {
    return this.http.post<Courier>(this.url+"new", courier);
  }

  deleteCourier(id:string){
    return this.http.delete(this.url+id);
  }

}
