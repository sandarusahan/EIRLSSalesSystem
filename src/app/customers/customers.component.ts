import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { Customer } from './../Models/Customer';
import { CustomerService } from './../Services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

 isNew :boolean = false;
  customer:Customer = <Customer> new Object();
  constructor(private route : ActivatedRoute, private customerService : CustomerService, private crudActionService:CrudActionsManageService, private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      if(id!=""||id!=null){
        this.customerService.getCustomer(id).subscribe(customer => {
        this.customer = <Customer> customer;
        console.log("parent")
      },
      err=>{
        console.log("hit error")
        this.onNewClick();
      })
      }
    });
    this.crudActionService.readonly();
  }

  onSubmit(form:Customer){
    if(this.isNew){
      this.customerService.addCustomer(form).subscribe(res=>{
        this.customer = <Customer>res;
        this.crudActionService.readonly();
    this.router.navigate(['customers'])

      }, 
      err => console.log(err))
    }else {
      this.customerService.updateCustomer(form).subscribe(res => {
        this.customer = res;
        this.crudActionService.readonly();
      })
    }
    this.isNew = false
    console.log(form)
    window.location.reload()
  }
  
  onNewClick() {
    this.isNew = true;
    this.customer = new Customer();
    this.crudActionService.editable();
  }

  onEditClick() {
    this.isNew = false;
    this.crudActionService.editable();
  }

  onDeleteClick(id:string){
    this.customerService.removeCustomer(id).subscribe(res=>{
      if(res){
        console.log('deleted')
        this.customer = new Customer();
        this.router.navigate(['customers'])
        
      }
      window.location.reload();
    });
  }
  

}
