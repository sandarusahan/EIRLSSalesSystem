import { Product } from './../Models/Product';
import { SalesOrder } from './../Models/SalesOrder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from '../Models/OrderItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesOrdersService {
  // orderUrl = "http://localhost:8080/sales-orders/"
  // orderItemUrl = "http://localhost:8080/item/"
  orderUrl = "https://sales-app-saho.herokuapp.com/sales-orders/"
  orderItemUrl = "https://sales-app-saho.herokuapp.com/item/"
  //prodUrl = "http://192.168.8.164:8080/products";
  constructor(private http:HttpClient) { }

  getInquiries(){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/INQUIRY")
  }

  getOrders(){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/ORDER")
  }

  getReturnsForExchage(){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/RETURN_EXCHANGE")
  }
  getReturnsForCredit(){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/RETURN_CREDIT")
  }
  getReturnsForRepair(){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/RETURN_REPAIR")
  }
  getOrdersByCustomer(orderType : string, customerId : string) {

    return this.http.get<SalesOrder[]>(this.orderUrl+"type/"+orderType+"/customer/"+customerId)
  }

  getOrdersByCustomerId(customerId : string) {

    return this.http.get<SalesOrder[]>(this.orderUrl+"customer/"+customerId)
  }

  getOrderTypeById(orderType, orderId){
    return this.http.get<SalesOrder[]>(this.orderUrl+"type/"+orderType+"/orderId/"+orderId)
  }

  getOrder(id:number){
    return this.http.get<SalesOrder>(this.orderUrl+id)
  }

  addOrder(salesOrder:SalesOrder) {
    return this.http.post<SalesOrder>(this.orderUrl+"new", salesOrder);
  }

  deleteOrder(id:number){
    return this.http.delete(this.orderUrl+id);
  }

  addItemsToOrder(orderItem:OrderItem){
    console.log("@ service"+orderItem.salesOrder.salesOrderId)
    return this.http.post<OrderItem>(this.orderItemUrl+"new", orderItem);
  }

  deleteOrderItem(id : number){
    return this.http.delete(this.orderItemUrl+id);
  }

  deleteAllItemsFromOrder(salesOrder : SalesOrder){
    return this.http.put<SalesOrder>(this.orderUrl+"order_items/clear", salesOrder);
  }

  switchOrderType(type: string, order:SalesOrder){
    {

      let url = this.orderUrl+"update"
      var salesOrderObs : Observable<SalesOrder>
      switch(type.toLowerCase()){
        case "inqury" : {
          order.orderType = "INQUIRY"
          salesOrderObs = this.http.put<SalesOrder>(url, order);
          break;
        }
        case "order" : {
          order.orderType = "ORDER"
          salesOrderObs = this.http.put<SalesOrder>(url, order);
          break;
        }
        case "return_exchange" : {
          order.orderType = "RETURN_EXCHANGE"
          salesOrderObs = this.http.put<SalesOrder>(url, order);
          break;
        }
        case "return_credit" : {
          order.orderType = "RETURN_CREDIT"
          salesOrderObs = this.http.put<SalesOrder>(url, order);
          break;
        }
        case "return_repair" : {
          order.orderType = "RETURN_REPAIR"
          salesOrderObs = this.http.put<SalesOrder>(url, order);
          break;
        }

        
    }
  
    return salesOrderObs;
    
    }
  }

  // getProducts(){
  //   return this.http.get<Product[]>(this.prodUrl);
  // }

}
