import { AuthenticateService } from './../Services/authenticate.service';
import { CourierService } from './../Services/courier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Courier } from '../Models/Courier';
import { CrudActionsManageService } from '../Services/crud-actions-manage.service';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css']
})
export class CourierComponent implements OnInit {

  courierObj:Courier = new Courier;
  isNew: boolean = false;
  constructor(private route:ActivatedRoute,private router:Router ,private courierService:CourierService, public crudActionService:CrudActionsManageService, private auth:AuthenticateService) { }

  ngOnInit() {
    this.auth.isAutherized("couriers");
    this.isNew = false;
    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      if (id != "" || id != null) {
        if (id == "new") {
          this.onNewClick();
        } else {
          this.courierService.getCourier(id).subscribe(courier => {
              this.courierObj = < Courier > courier;
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


  onNewClick() {
    this.isNew = true;
    this.courierObj = new Courier();
    this.crudActionService.editable();
  }

  onEditClick() {
    this.isNew = false;
    this.crudActionService.editable();
  }

  onDeleteClick(id: string) {
    this.courierService.deleteCourier(id).subscribe(res => {
      if (res) {
        console.log('deleted')
        this.courierObj = new Courier();
        this.router.navigate(['courier'])

      }
    });
  }

  onSubmit(form: Courier) {
    // if (this.isNew) {
      this.courierService.addNewCourier(form).subscribe(res => {
          this.courierObj = < Courier > res;
          this.crudActionService.readonly();
          this.router.navigate(['courier', res.courierId])

        },
        err => console.log(err))
    // } else {
    //   this.courierService.addNewCourier(form).subscribe(res => {
    //     this.courierObj = res;
    //     this.crudActionService.readonly();
    //   })
    // }
    this.isNew = false
    console.log(form)
    // this.router.navigate(['courier', this.courierObj.courierId])
  }
}
