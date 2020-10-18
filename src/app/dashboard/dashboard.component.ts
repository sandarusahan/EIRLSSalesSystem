import { Component, OnInit } from '@angular/core';
import { SalesOrdersService } from '../Services/sales-orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private orderService : SalesOrdersService) { }
  ordersCount : number = 0;
  inqCount: number = 0;
  returnsCount:number = 0;
  ngOnInit() {
    this.orderService.getInquiries().subscribe(inqs => {
      this.inqCount = inqs.length;
    });
    this.orderService.getOrders().subscribe(orders => {
      this.ordersCount = orders.length;
    });
    this.orderService.getReturnsForExchage().subscribe(returns => {
      this.returnsCount = returns.length;
    });
  }

}
