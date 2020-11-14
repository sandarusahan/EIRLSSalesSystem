import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from './../Services/authenticate.service';
import { User } from './../Models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user:User = <User> new Object();
  confirmPassword:string = "";
  access:string[] = []
  customers:boolean = false;
  inquiries:boolean = false;
  orders:boolean = false;
  returns:boolean = false;
  couriers:boolean = false;
  isNew: boolean = false;
  isEdit: boolean = false;
  constructor(private authService:AuthenticateService, private router:Router, private route:ActivatedRoute, public crudActionService:CrudActionsManageService) { }

  ngOnInit() {
    this.isNew = false;
    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      if (id != "" || id != null) {
        if (id == "new") {
          this.onNewClick();
        } else {
          this.authService.findUser(id).subscribe(user => {
              this.user = user;
              console.log(user.role)
              this.isEdit = true;
              this.manageEmployeeAccess();
            },
            err => {
              console.log("error!!.." + err)
              this.onNewClick();
            })
        }

      }
    });
  }

  onNewClick() {
    this.isNew = true;
    this.user = <User> new Object();
    this.crudActionService.editable();
  }

  onSubmit(form){
    this.user.userAccess = "";
    this.access = [];
    if(form.value.couriers){
      this.access.push("couriers")
    }
    if(form.value.customers){
      this.access.push("customers")
    }
    if(form.value.inquiries){
      this.access.push("inquiries")
    }
    if(form.value.orders){
      this.access.push("orders")
    }
    if(form.value.returns){
      this.access.push("returns")
    }

    for(let acc of this.access){
      this.user.userAccess = acc+","+this.user.userAccess;
    }

    if(this.isEdit){
      this.authService.updateUser(this.user).subscribe(user => {
        console.log(user)
        this.router.navigate(['manage','employees', this.user.username]);
      })
    } else if(this.isNew){
      this.authService.registerUser(this.user).subscribe(user => {
        console.log(user)
        this.router.navigate(['manage','employees', this.user.username]);
      });
    }
    

  }

  manageEmployeeAccess(){
    if(this.user.userAccess == undefined){
      this.user.userAccess = "";
    }
    if(this.user.userAccess.includes("customers")){
      this.customers = true;
    }
    
    if (this.user.userAccess.includes("inquiries")){
      this.inquiries = true;
    } 
    
    if (this.user.userAccess.includes("orders")){
      this.orders = true;
    } 
    
    if (this.user.userAccess.includes("returns")){
      this.returns = true;
    } 
    
    if (this.user.userAccess.includes("couriers")){
      this.couriers = true;
    }
  }

}
