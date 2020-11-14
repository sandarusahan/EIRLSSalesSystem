import { AuthenticateService } from './../Services/authenticate.service';
import { Router } from '@angular/router';
import { SalesOrder } from './../Models/SalesOrder';
import { SalesOrdersService } from './../Services/sales-orders.service';
import { Component, OnInit } from '@angular/core';
import { CrudActionsManageService } from '../Services/crud-actions-manage.service';

@Component({
  selector: 'app-find-inquiry',
  templateUrl: './find-inquiry.component.html',
  styleUrls: ['./find-inquiry.component.css']
})
export class FindInquiryComponent implements OnInit {

  inquiries:SalesOrder[] = []
  constructor(private crudManager:CrudActionsManageService, private ordersService:SalesOrdersService, private router:Router, private auth:AuthenticateService) { }

  ngOnInit() {
    this.auth.isAutherized("inquiries");
    this.crudManager.show();
    this.ordersService.getInquiries().subscribe(res => {
      this.inquiries = res;
    })
  }

  ngOnChanges(){
    this.ordersService.getInquiries().subscribe(res => {
      this.inquiries = res;
    })
  }

  onNewClick() {
    this.router.navigate(['inquiry','new']);
  }

}
