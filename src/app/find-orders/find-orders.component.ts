import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-orders',
  templateUrl: './find-orders.component.html',
  styleUrls: ['./find-orders.component.css']
})
export class FindOrdersComponent implements OnInit {

  constructor(private crudManager:CrudActionsManageService) { }

  ngOnInit() {
    this.crudManager.show();
  }

}
