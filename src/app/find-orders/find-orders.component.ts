import { AuthenticateService } from './../Services/authenticate.service';
import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../Models/SalesOrder';
import { SalesOrdersService } from '../Services/sales-orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-orders',
  templateUrl: './find-orders.component.html',
  styleUrls: ['./find-orders.component.css']
})
export class FindOrdersComponent implements OnInit {

  orders : SalesOrder[] = []
  constructor(private crudManager:CrudActionsManageService, private orderService : SalesOrdersService, private router:Router, private auth:AuthenticateService) { }

  ngOnInit() {
    if(this.auth.authenticated){
      this.crudManager.show();

      this.orderService.getOrders().subscribe(res => this.orders = res)
    }else{
      this.router.navigate(['login'])

    }
    
  }

  onNewClick() {
    this.router.navigate(['orders','new']);
  }

}
