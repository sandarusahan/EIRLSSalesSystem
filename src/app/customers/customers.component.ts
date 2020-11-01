import { AuthenticateService } from './../Services/authenticate.service';
import {  CrudActionsManageService} from './../Services/crud-actions-manage.service';
import {  Customer} from './../Models/Customer';
import {  CustomerService} from './../Services/customer.service';
import {  ActivatedRoute,  Router} from '@angular/router';
import {  Component,  OnInit} from '@angular/core';
import { SalesOrdersService } from '../Services/sales-orders.service';
import { SalesOrder } from '../Models/SalesOrder';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  isNew: boolean = false;
  isNewPage:boolean = false;
  isEdit: boolean = false;
  canDel:boolean = true;
  customer: Customer = < Customer > new Object();
  loadedCustomer: Customer = < Customer > new Object();

  customerOrders:SalesOrder[] = [];

  errBool: boolean = false;
  errMsg: string = "";
  constructor(private route: ActivatedRoute, private customerService: CustomerService, public crudActionService: CrudActionsManageService, private router: Router, private orderService:SalesOrdersService) {}

  ngOnInit() {
      this.route.paramMap.subscribe(param => {
        let id = param.get('id');
        if (id != "" || id != null) {
          if (id == "new") {
            this.onNewClick();
            this.isNewPage = true;
            this.customer.customerType = "Customer";
          } else {
            this.isNewPage = false;
            this.customerService.getCustomer(id).subscribe(customer => {
                this.customer = this.loadedCustomer = < Customer > customer;
                this.crudActionService.readonly();
              },
              err => {
                console.log("error!!.." + err)
                this.onNewClick();
              })

            this.orderService.getOrdersByCustomerId(id).subscribe(res => {
              this.customerOrders = res
              this.canDel = this.customerOrders.length == 0
            });  
          }
  
        }
      });
    
      
  }

  onSubmit(form: Customer) {
    if (this.isNew) {
      this.customerService.addCustomer(form).subscribe(res => {
          this.customer = < Customer > res;
          this.crudActionService.readonly();
          this.router.navigate(['customers'])

        },
        err => console.log(err))
    } else {
      this.customerService.updateCustomer(form).subscribe(res => {
        this.customer = res;
        this.crudActionService.readonly();
      })
    }
    this.isNew = false
    console.log(form)
  }

  onNewClick() {
    this.isNew = true;
    this.isEdit = false;
    this.customer = new Customer();
    this.customer.customerType = "Customer"
    this.crudActionService.editable();
  }
  onCancelNewClick() {
    if(this.isNewPage){
      this.router.navigate(['customers'])
    }else {
      this.isNew = false;
      this.isEdit = false;
      this.customer = this.loadedCustomer;
      this.crudActionService.readonly();
    }
    
  }
  onEditClick() {
    this.isNew = false;
    this.isEdit = true;
    this.crudActionService.editable();
  }
  onCancelEditClick(){
    this.isNew = false;
    this.isEdit = false;
    this.crudActionService.readonly();
  }
  onDeleteClick(id: string) {
    if(this.customerOrders.length > 0){
      this.canDel = false;
    }else {
      this.canDel = true;
    
      this.customerService.removeCustomer(id).subscribe(res => {
        if (res) {
          console.log('deleted')
          this.customer = new Customer();
          this.router.navigate(['customers'])

        }
      });
    }
  }

  checkEmail(){
    console.log(this.customer.customerEmail)
    this.customerService.getCustomerByEmail(this.customer.customerEmail).subscribe(res => {
      if(res != null){
        this.errBool = true;
        this.errMsg = "Customer with this email, already exist"
      }else{
        this.errBool = false;
        this.errMsg = ""
      }
    })
  }

}
