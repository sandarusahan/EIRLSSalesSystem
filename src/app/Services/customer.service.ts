import { Customer } from './../Models/Customer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = "https://sales-app-saho.herokuapp.com/customer/"
  constructor(private http:HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(this.url+"all")
  }

  getCustomer(cutomerId:string) {
    return this.http.get<Customer>(this.url+cutomerId)
  }

  getCustomerByEmail(email:string) {
    return this.http.get<Customer>(this.url+"email/"+email)
  }

  addCustomer(customer : Customer){
    return this.http.post<Customer>(this.url+"new", customer);
  }

  updateCustomer(customer : Customer){
    return this.http.put<Customer>(this.url+"update", customer);
  }

  removeCustomer(custId:string) {
    return this.http.delete(this.url+custId);
  }
}
