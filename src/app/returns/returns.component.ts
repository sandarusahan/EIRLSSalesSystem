import { Courier } from './../Models/Courier';
import { Customer } from './../Models/Customer';
import { SalesOrdersService } from './../Services/sales-orders.service';
import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../Models/SalesOrder';
import * as moment from 'moment';
import { OrderItem } from '../Models/OrderItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {
  errBool:boolean = false;
  errMsg:string = ''
  isNew = false;
  valid:boolean = false;
  order : SalesOrder = <SalesOrder> new Object;
  customer : Customer = <Customer> new Object();
  courierObj : Courier = <Courier> new Object();

  orderId
  orderItems: OrderItem[] =[];
  constructor(private orderService : SalesOrdersService, private router: Router) { }

  ngOnInit() {
  }

  onNewClick() {
    this.isNew = true;
    this.order = new SalesOrder();
    this.orderItems = []
    
  }

  onEditClick() {
    this.isNew = true;
    // this.crudActionService.editable();
  }

  onDeleteClick(id: string) {
    this.orderService.deleteOrder(id).subscribe(res => {
      if (res) {
        console.log('deleted')
        this.order = new SalesOrder();
        this.router.navigate(['returns'])

      }
    });
  }

  findOrder(){
    console.log(this.orderId);
    this.orderService.getOrder(this.orderId).subscribe(order => {
      this.valid = true;
      this.order = order;
      this.order.dueDate = moment(order.dueDate).format("YYYY-MM-DD");
      this.order.orderDate = moment(order.orderDate).format("YYYY-MM-DD");
      this.customer = order.customer;
      this.courierObj = order.courier;
      this.orderItems = order.orderItems;
    }, err => {
      this.valid = false;
      this.errBool = true;
      this.errMsg = "Invalid order id !!"
    })
  }
}
