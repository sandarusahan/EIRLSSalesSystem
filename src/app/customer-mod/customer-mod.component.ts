import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { CustomerService } from './../Services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from './../Models/Customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-mod',
  templateUrl: './customer-mod.component.html',
  styleUrls: ['./customer-mod.component.css']
})
export class CustomerModComponent implements OnInit {

  
  customer:Customer = <Customer> new Object();

  constructor(private route : ActivatedRoute, private customerService : CustomerService, private crudActionService:CrudActionsManageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let id = param.get('keword');
      console.log("yo"+id)
      if(id!=""||id!=null){
        this.customerService.getCustomer(id).subscribe(customer => {
        this.customer = <Customer> customer;
        console.log("parent")
      })
      }
    });
  }
  
}
