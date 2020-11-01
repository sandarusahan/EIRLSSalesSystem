import { CourierService } from './../Services/courier.service';
import { CustomerService } from './../Services/customer.service';
import { Courier } from './../Models/Courier';
import { Customer } from './../Models/Customer';
import { SelectedItem } from './../Models/SelectedItem';
import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SalesOrder } from './../Models/SalesOrder';
import { SalesOrdersService } from './../Services/sales-orders.service';
import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../Models/OrderItem';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {

  errBool:boolean = false;
  errMsg:string = ''
  isNew = false;
  isEdit = false;
  inquiry : SalesOrder = <SalesOrder> new Object;
  customer : Customer = <Customer> new Object();
  courierObj : Courier = <Courier> new Object();
  couriers : Courier[] = [];
  //product : Product = new Product();
  // shipmentType : string = "post";

  orderItems : OrderItem[] = [];

  selection : SelectedItem[] = [];
  prodErr: string="";
  isNewPage: boolean = false;
  loadedInq: SalesOrder = new SalesOrder();
  errBoolEmail: boolean = false;
  errBoolMob: boolean = false;
  
  
  constructor(private orderService : SalesOrdersService, private route:ActivatedRoute, public crudActionService: CrudActionsManageService, private router: Router, private customerService:CustomerService, private courierService : CourierService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      if(id != null || id != ""){
        if(id != "new"){
          this.isNewPage = false;
          this.getOrder(+id);
        }else {
          this.isNewPage = true;
          this.onNewClick();

        }
      }
    })

    // this.orderService.getProducts().subscribe(prods => {
    //   this.products = prods;
    //   console.log(prods)
    //   this.selection = [];
    // for(let i=0;i<this.products.length;i++){
    //   let selectedItem = <SelectedItem> new Object();

    //     selectedItem.product = this.products[i];
    //     selectedItem.qtyReq = 0;
    //     selectedItem.added = false;
    //     this.selection.push(selectedItem)
      
    // }
    // })
    
  }

  onNewClick() {
    this.isNew = true;
    this.isEdit = false;
    this.inquiry = new SalesOrder();
    this.inquiry.orderDate = moment().format("YYYY-MM-DD");
    this.customer = new Customer();
    this.courierObj = new Courier();
    this.crudActionService.editable();
    this.orderItems = []
    
    this.getAllCouriers();
  }

  onCancelNewClick() {
    
    if(this.isNewPage){
      this.router.navigate(['inquiry'])
    }else {
      this.isNew = false;
      this.isEdit = false;
      this.errBool = false;
      this.inquiry = this.loadedInq;
      this.getOrder(this.loadedInq.salesOrderId);
      this.crudActionService.readonly();
    }
    
  }
  
  onEditClick() {
    this.isNew = false;
    this.isEdit = true;
    this.getAllCouriers();
    this.crudActionService.editable();
  }

  onCancelEditClick(){
    this.isNew = false;
    this.isEdit = false;
    this.crudActionService.readonly();
  }

  onDeleteClick(id: number) {
    this.orderService.deleteOrder(id).subscribe(res => {
      if (res) {
        console.log('deleted')
        this.inquiry = new SalesOrder();
        this.router.navigate(['inquiry'])

      }
    });
  }

  

  // getQty(prodId:string){
  //   return this.products.find(prod => prod.id == prodId).quantity;
  // }

  getOrder(id : number) {
    this.orderService.getOrder(id).subscribe(inquiry => {
      this.inquiry = <SalesOrder> inquiry;
      this.inquiry.dueDate = moment(inquiry.dueDate).format("YYYY-MM-DD");
      this.inquiry.orderDate = moment(inquiry.orderDate).format("YYYY-MM-DD");
      this.customer = this.inquiry.customer;
      this.courierObj = this.inquiry.courier;
      this.orderItems = this.inquiry.orderItems;
      // this.shipmentType = this.inquiry.shipmentType;
      this.crudActionService.readonly();
      this.loadedInq = this.inquiry;
    },
    err => console.log("error fetching inquiries"+err))
  }

  updateItem(item:SelectedItem){
    item.added = false;
  }

  addItemToInquiry(form:NgForm){
    let product = form.value;
    let orderItem : OrderItem = <OrderItem> new Object();
    orderItem.productId = product.id;
    orderItem.productName = product.name;
    orderItem.productPrice = product.price;
    orderItem.available = true;
    if(product.id != "" || product.name != "" || product.price != "") {
      if(orderItem.qty == null){
        orderItem.qty = 0;
      }
      orderItem.qty = product.quantity?product.quantity:1;
      orderItem.cancelled = false;

      let oitem = this.orderItems.find(x => x.productId == product.id)
      if(oitem != null){
        oitem.qty =+ orderItem.qty;
      }else{
        this.orderItems.push(orderItem);
        form.resetForm();
      }
      
    }else {
      this.prodErr = "**Product id, Product name or Price cannot be empty"
    }
  }

  clearItem(index:number) {
    // this.orderService.deleteOrderItem(item.orderItemId).subscribe(res => console.log(res))   
    // this.ngOnInit();
    this.orderItems.splice(index,1);
  }

  onSubmit(form){

    if(form != null){
      this.inquiry.orderDate = moment(form.orderDate).format("YYYY-MM-DD");
      this.inquiry.dueDate = moment(form.dueDate).format("YYYY-MM-DD");
      this.inquiry.shipmentType = form.shipmentType;
      this.inquiry.orderType = "INQUIRY"
      this.inquiry.orderStatus = "NEW"
      if(this.customer != null){
        this.inquiry.customer = this.customer;
      }else{
        this.inquiry.customer = new Customer();
        console.log("customer not found")
      }
      if(this.courierObj != null){
        this.inquiry.courier = this.courierObj;
      }
      this.inquiry.orderItems = this.orderItems;
    console.log(this.inquiry)

    this.orderService.addOrder(this.inquiry).subscribe(inq => {
      this.inquiry = inq;
      this.isNew = false;
      this.router.navigate(['inquiry']);
    })
    }
    
  }

  placeOrder() {
    this.orderService.switchOrderType("ORDER", this.inquiry).subscribe(res => {
      this.router.navigate(['../orders', res.salesOrderId])
    })
  }

  findCustomer(email){
    this.customerService.getCustomerByEmail(email).subscribe(res => {
      if(res != null){
        this.customer =res;
        this.errBool = false;
        this.errBoolEmail = false;
        this.errBoolMob = false;
      }else{
        this.errBool = true
        this.errBoolEmail = true
        this.customer = new Customer();
        this.errMsg = " Invalid email !!"
      }
      
    },
    err=>{
      this.errBool = true
    })
  }

  findCustomerByMobile(mobile){
    this.customerService.getCustomerByMobile(mobile).subscribe(res => {
      if(res != null){
        this.customer =res;
        this.errBool = false
        this.errBoolMob = false
        this.errBoolEmail = false;
      }else{
        this.errBool = true
        this.errBoolMob = true
        this.customer = new Customer();
        this.errMsg = " Invalid Mobile No !!"
      }
      
    },
    err=>{
      this.errBool = true
    })
  }

  getAllCouriers(){
    this.courierService.getAllCouriers().subscribe(couriers => {
      this.couriers = couriers;
    })
  }

  selectCourier(courier:Courier){
    console.log(courier)
    let c = new Courier();
    c.company = courier.company;
    c.vehicleType = courier.vehicleType;
    c.telephone = courier.telephone;
    c.vehicleId = courier.vehicleId;
    c.courierId = courier.courierId;

    this.courierObj = c;
  }

  validateForm(form){
    console.log(form)
    if(form.orderDate = undefined){
      this.errBool = true;
      this.errMsg = "Due date must be after the order date !!"
    } 
    else if(form.dueDate = undefined){
      this.errBool = true;
      this.errMsg = "Due date must be after the order date !!"
    } 
    else if(form.customerName == undefined){
      //console.log(form)
      this.errBool = true;
      this.errMsg = "Inquiry must have a customer !!"
    }
    else if(form.shipmentType == undefined){
      if(form.courier == null){
        this.errBool = true;
        this.errMsg = "Delivery type not found !!"
      }
    }
    else if(form.shipmentType == "Courier"){
      if(form.vehicleType == undefined){
        this.errBool = true;
        this.errMsg = "Courier not found !!"
      }
    }
    else{
      this.errBool = false;
      this.errMsg = "";
      this.onSubmit(form);
    }

  }
}
