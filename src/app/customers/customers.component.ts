import { AuthenticateService } from './../Services/authenticate.service';
import {  CrudActionsManageService} from './../Services/crud-actions-manage.service';
import {  Customer} from './../Models/Customer';
import {  CustomerService} from './../Services/customer.service';
import {  ActivatedRoute,  Router} from '@angular/router';
import {  Component,  OnInit} from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  isNew: boolean = false;
  customer: Customer = < Customer > new Object();
  errBool: boolean = false;
  errMsg: string = "";
  constructor(private route: ActivatedRoute, private customerService: CustomerService, private crudActionService: CrudActionsManageService, private router: Router) {}

  ngOnInit() {
      this.route.paramMap.subscribe(param => {
        let id = param.get('id');
        if (id != "" || id != null) {
          if (id == "new") {
            this.onNewClick();
          } else {
            this.customerService.getCustomer(id).subscribe(customer => {
                this.customer = < Customer > customer;
                this.crudActionService.readonly();
              },
              err => {
                console.log("error!!.." + err)
                this.onNewClick();
              })
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
    this.customer = new Customer();
    this.crudActionService.editable();
  }

  onEditClick() {
    this.isNew = false;
    this.crudActionService.editable();
  }

  onDeleteClick(id: string) {
    this.customerService.removeCustomer(id).subscribe(res => {
      if (res) {
        console.log('deleted')
        this.customer = new Customer();
        this.router.navigate(['customers'])

      }
    });
  }

  checkEmail(){
    console.log(this.customer.customerEmail)
    this.customerService.getCustomerByEmail(this.customer.customerEmail).subscribe(res => {
      if(res != null){
        this.errBool = true;
        this.errMsg = "Customer with this email, already available"
      }else{
        this.errBool = false;
        this.errMsg = ""
      }
    })
  }

}
