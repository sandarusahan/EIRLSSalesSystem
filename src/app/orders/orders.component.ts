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
  inquiry: SalesOrder;
  customer: Customer;
  orderItems: OrderItem[];

    
  constructor(private route:ActivatedRoute, private router:Router,private crudActionService: CrudActionsManageService, private orderService: SalesOrdersService) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      if(id != null || id != ""){
        if(id != "new"){
          this.getOrder(id);
        }else {
          this.onNewClick();
        }
      }
    })

    
  }
  getOrder(id: string) {
    
  }

  onNewClick() {
    this.isNew = true;
    this.inquiry = new SalesOrder();
    this.inquiry.orderDate = moment().format("YYYY-MM-DD");
    this.customer = new Customer();
    this.crudActionService.editable();
    this.orderItems = []
  }

  onEditClick() {
    this.isNew = false;
    this.crudActionService.editable();
  }

  onDeleteClick(id: string) {
    this.orderService.deleteOrder(id).subscribe(res => {
      if (res) {
        console.log('deleted')
        this.inquiry = new SalesOrder();
        this.router.navigate(['inquiry'])

      }
    });
  }

}
