import { Courier } from './../Models/Courier';
import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../Models/SalesOrder';
import { Customer } from '../Models/Customer';
import * as moment from 'moment';
import { OrderItem } from '../Models/OrderItem';
import { SalesOrdersService } from '../Services/sales-orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  isNew: boolean;
  order: SalesOrder = <SalesOrder> new Object();
  loadedOrder: SalesOrder = <SalesOrder> new Object();
  customer : Customer = <Customer> new Object();
  courierObj : Courier = <Courier> new Object();
 
  orderItems: OrderItem[] = [];
  isEdit: boolean = false;

    
  constructor(private route:ActivatedRoute, private router:Router,public crudActionService: CrudActionsManageService, private orderService: SalesOrdersService) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      if(id != null || id != ""){
        // if(id != "new"){
          this.getOrder(+id);
        // }else {
        //   this.onNewClick();
        // }
      }
    })

    
  }
  getOrder(id: number) {
    this.orderService.getOrder(id).subscribe(order => {
    this.order = <SalesOrder> order;
    this.order.dueDate = moment(order.dueDate).format("YYYY-MM-DD");
    this.order.orderDate = moment(order.orderDate).format("YYYY-MM-DD");
    this.customer = this.order.customer;
    this.courierObj = this.order.courier;
    this.orderItems = this.order.orderItems;
    
    // this.shipmentType = this.order.shipmentType;
    this.crudActionService.readonly();
    console.log(this.order)
    this.loadedOrder = this.order;
    },
    err => console.log("error fetching inquiries"+err))
  }

  // onNewClick() {
  //   this.isNew = true;
  //   this.order = new SalesOrder();
  //   this.order.orderDate = moment().format("YYYY-MM-DD");
  //   this.order.orderStatus = "ACTIVE"
  //   this.customer = new Customer();
  //   this.crudActionService.editable();
  //   this.orderItems = []
  // }

  onEditClick() {
    this.isEdit = true;
    this.crudActionService.editable();
  }

  onCancelEditClick(){
    this.isNew = false;
    this.isEdit = false;
    this.order = this.loadedOrder;
    this.orderItems = [];
    this.getOrder(this.loadedOrder.salesOrderId);
    this.crudActionService.readonly();
  }

  onDeleteClick(id: number) {
    this.orderService.deleteOrder(id).subscribe(res => {
      console.log('deleted' + res)

      if (res) {
        console.log('deleted')
        this.order = new SalesOrder();
        this.router.navigate(['order'])

      }
    });
  }

  onSubmit(){
    this.order.dueDate = moment(this.order.dueDate).format("YYYY-MM-DD");
    this.orderService.addOrder(this.order).subscribe(order => {
      console.log(order)
      this.order = <SalesOrder> order;
      this.order.dueDate = moment(order.dueDate).format("YYYY-MM-DD");
      this.order.orderDate = moment(order.orderDate).format("YYYY-MM-DD");
      this.customer = this.order.customer;
      this.courierObj = this.order.courier;
      this.orderItems = this.order.orderItems;
    },
    err => console.log(err));
    this.onCancelEditClick();
  }
  cancelOrder(){
    this.order
    let newOrder = new SalesOrder();
    newOrder = this.order;
    newOrder.orderStatus = "Cancelled"

    this.orderService.addOrder(newOrder).subscribe(inq => {
      this.order = inq;
      this.isNew = false;
    })
  }

}
