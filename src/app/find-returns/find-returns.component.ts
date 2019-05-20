import { SalesOrdersService } from './../Services/sales-orders.service';
import { SalesOrder } from './../Models/SalesOrder';
import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-returns',
  templateUrl: './find-returns.component.html',
  styleUrls: ['./find-returns.component.css']
})
export class FindReturnsComponent implements OnInit {

  returns : SalesOrder[] = []
  constructor(private crudManager:CrudActionsManageService, private orderService : SalesOrdersService) { }

  ngOnInit() {
    this.crudManager.show()

    this.orderService.getReturns().subscribe(res => this.returns = res)
  }

}
