import { AuthenticateService } from './../Services/authenticate.service';
import { SalesOrdersService } from './../Services/sales-orders.service';
import { SalesOrder } from './../Models/SalesOrder';
import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-returns',
  templateUrl: './find-returns.component.html',
  styleUrls: ['./find-returns.component.css']
})
export class FindReturnsComponent implements OnInit {

  returnsEx : SalesOrder[] = []
  returnsRep : SalesOrder[] = []
  returnsCred : SalesOrder[] = []
  constructor(private crudManager:CrudActionsManageService, private orderService : SalesOrdersService, private auth:AuthenticateService, private router: Router) { }

  ngOnInit() {
    this.auth.isAutherized("returns");
    this.crudManager.show()
    this.orderService.getReturnsForCredit().subscribe(res => this.returnsCred = res)
    this.orderService.getReturnsForExchage().subscribe(res => this.returnsEx = res)
    this.orderService.getReturnsForRepair().subscribe(res => this.returnsRep = res)
  }

  onNewClick() {
    this.router.navigate(['returns','new']);
  }
}
