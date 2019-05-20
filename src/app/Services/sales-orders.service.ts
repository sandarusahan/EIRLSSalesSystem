import { SalesOrder } from './../Models/SalesOrder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from '../Models/OrderItem';

@Injectable({
  providedIn: 'root'
})
export class SalesOrdersService {
  orderUrl = "http://localhost:8080/order/"
  orderItemUrl = "http://localhost:8080/item/"

  constructor(private http:HttpClient) { }

  getInquiries(){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/INQUIRY")
  }

  getOrders(){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/ORDER")
  }

  getReturns(){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/RETURN")
  }

  getOrdersByCustomer(orderType : string, customerId : string) {

    return this.http.get<SalesOrder[]>(this.orderUrl+"type/"+orderType+"/customer/"+customerId)
  }

  getOrder(id:string){
    return this.http.get<SalesOrder>(this.orderUrl+id)
  }

  addOrder(salesOrder:SalesOrder) {
    return this.http.post<SalesOrder>(this.orderUrl+"new", salesOrder);
  }

  deleteOrder(id:string){
    return this.http.delete(this.orderUrl+id);
  }

  addItemsToOrder(orderItem:OrderItem){
    console.log("@ service"+orderItem.salesOrder.salesOrderId)
    return this.http.post<OrderItem>(this.orderItemUrl+"new", orderItem);
  }

  deleteOrderItem(id : string){
    return this.http.delete(this.orderItemUrl+id);
  }

  deleteAllItemsFromOrder(salesOrder : SalesOrder){
    return this.http.put<SalesOrder>(this.orderUrl+"order_items/clear", salesOrder);
  }
  
}
