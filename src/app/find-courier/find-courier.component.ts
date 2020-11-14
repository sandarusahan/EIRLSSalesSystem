import { AuthenticateService } from './../Services/authenticate.service';
import { Courier } from './../Models/Courier';
import { CourierService } from './../Services/courier.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-courier',
  templateUrl: './find-courier.component.html',
  styleUrls: ['./find-courier.component.css']
})
export class FindCourierComponent implements OnInit {

  couriers:Courier[] = [];
  courier:Courier = new Courier();
  constructor(private courierService:CourierService, private router:Router, private auth:AuthenticateService) { }

  ngOnInit() {
    this.auth.isAutherized("couriers");
    this.courierService.getAllCouriers().subscribe(res => this.couriers = res);
  }

  addCourier(courier:Courier){
    this.courierService.addNewCourier(courier).subscribe(res => this.courier = res)
  }

  onNewClick() {
    this.router.navigate(['courier','new']);
  }
}
