import { AuthenticateService } from './../Services/authenticate.service';
import { Customer } from './../Models/Customer';
import { CustomerService } from './../Services/customer.service';
import { Component, OnInit } from '@angular/core';
import { CrudActionsManageService } from '../Services/crud-actions-manage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-find-cutomers',
  templateUrl: './find-cutomers.component.html',
  styleUrls: ['./find-cutomers.component.css']
})
export class FindCutomersComponent implements OnInit {

  
  customers : Customer[]= [];
  constructor(private crudManager:CrudActionsManageService, private customerService:CustomerService, private router:Router, private route : ActivatedRoute, private auth : AuthenticateService) { }

  ngOnInit() {
    if(this.auth.authenticated){
      this.crudManager.show();
      this.getCustomers();
    }else{
    this.router.navigate(['login']);
    }
    
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(res => {
      this.customers = res;
    })
  }

  onRowClick(customer:Customer){
    console.log(customer)
    this.router.navigate(['customers', customer.customerId]);
  }

  selected(event){
    console.log(event)
  }

  onNewClick() {
    this.router.navigate(['customers','new']);
  }

  
  // onDeleteClick(id:string){
  //   this.customerService.removeCustomer(id).subscribe(res=>{
  //     if(res){
  //       console.log('deleted')
  //       // this.customer = new Customer();
  //       this.router.navigate(['customers'])
        
  //     }
  //     window.location.reload();
  //   });
  // }
}
