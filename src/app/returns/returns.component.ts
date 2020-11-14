import { AuthenticateService } from './../Services/authenticate.service';
import { Courier } from './../Models/Courier';
import { Customer } from './../Models/Customer';
import { SalesOrdersService } from './../Services/sales-orders.service';
import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../Models/SalesOrder';
import * as moment from 'moment';
import { OrderItem } from '../Models/OrderItem';
import { Router, ActivatedRoute } from '@angular/router';

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

  returnReady:boolean = false;
  orderId
  orderItems: OrderItem[] =[];
  constructor(private orderService : SalesOrdersService, private router: Router, private route:ActivatedRoute, private auth:AuthenticateService) { }

  ngOnInit() {
    this.auth.isAutherized("returns");
    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      if(id != null || id != ""){
        if(id != "new"){
          console.log(id)
          this.orderService.getOrder(+id).subscribe(order => {
            this.order = order;
            this.order.dueDate = moment(order.dueDate).format("YYYY-MM-DD");
            this.order.orderDate = moment(order.orderDate).format("YYYY-MM-DD");
            this.customer = order.customer;
            this.courierObj = order.courier;
            this.isNew = false;
            this.returnReady = true
          })
        }else {
          this.onNewClick();
          
        }
      }
    })

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

  onDeleteClick(id: number) {
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
      this.errBool = false;
      this.returnReady = true;
      this.order = order;
      this.order.dueDate = moment(order.dueDate).format("YYYY-MM-DD");
      this.order.orderDate = moment(order.orderDate).format("YYYY-MM-DD");
      this.customer = order.customer;
      this.courierObj = order.courier;
      this.orderItems = order.orderItems;
    }, err => {
      this.valid = false;
      this.errBool = true;
      this.returnReady = false;
      this.order = new SalesOrder();
      this.errMsg = "Invalid order id !!"
    })
  }

  returnOrder(returnType){
    switch (returnType) {
      case 'exchange': 
        this.orderService.switchOrderType('return_exchange', this.order).subscribe(order => {
          this.order = order;
          this.order.dueDate = moment(order.dueDate).format("YYYY-MM-DD");
          this.order.orderDate = moment(order.orderDate).format("YYYY-MM-DD");
        })
      break;
      case 'credit':
        this.orderService.switchOrderType('return_credit', this.order).subscribe(order => {
          this.order = order;
          this.order.dueDate = moment(order.dueDate).format("YYYY-MM-DD");
          this.order.orderDate = moment(order.orderDate).format("YYYY-MM-DD");
        })
      break;
      case 'repair':
        this.orderService.switchOrderType('return_repair', this.order).subscribe(order => {
          this.order = order;
          this.order.dueDate = moment(order.dueDate).format("YYYY-MM-DD");
          this.order.orderDate = moment(order.orderDate).format("YYYY-MM-DD");
        })   
      break;
    }
  }

}
