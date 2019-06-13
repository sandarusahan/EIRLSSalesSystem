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
import { Product } from './../Models/Product';
import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../Models/OrderItem';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {

  errBool:boolean = false;
  errMsg:string = ''
  isNew = false;
  inquiry : SalesOrder = <SalesOrder> new Object;
  customer : Customer = <Customer> new Object();
  courierObj : Courier = <Courier> new Object();
  couriers : Courier[] = [];
  // shipmentType : string = "post";

  orderItems : OrderItem[] = [];

  selection : SelectedItem[] = [];
  
  products : Product[] = [{productId:"jnfwn1", productName:"A", productPrice:22, qty:10, reference:""},
                          {productId:"jnfwn2", productName:"B", productPrice:22, qty:10, reference:""},
                          {productId:"jnfwn3", productName:"C", productPrice:22, qty:10, reference:""},
                          {productId:"jnfwn4", productName:"D", productPrice:22, qty:10, reference:""},
                          {productId:"jnfwn5", productName:"E", productPrice:22, qty:10, reference:""}]
  
  constructor(private orderService : SalesOrdersService, private route:ActivatedRoute, private crudActionService: CrudActionsManageService, private router: Router, private customerService:CustomerService, private courierService : CourierService) { 
    this.selection = [];
    for(let i=0;i<this.products.length;i++){
      let selectedItem = <SelectedItem> new Object();

        selectedItem.product = this.products[i];
        selectedItem.qtyReq = 0;
        selectedItem.added = false;
        this.selection.push(selectedItem)
      
    }
    
  }

  ngOnInit() {
    
    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      if(id != null || id != ""){
        if(id != "new"){
          console.log(id)
          this.getOrder(+id);
        }else {
          this.onNewClick();

        }
      }
    })

    
  }

  onNewClick() {
    this.isNew = true;
    this.inquiry = new SalesOrder();
    this.inquiry.orderDate = moment().format("YYYY-MM-DD");
    this.customer = new Customer();
    this.courierObj = new Courier();
    this.crudActionService.editable();
    this.orderItems = []
    
    this.getAllCouriers();
  }

  onEditClick() {
    this.isNew = true;
    this.crudActionService.editable();
  }

  onDeleteClick(id: string) {
    this.orderService.deleteOrder(id).subscribe(res => {
      if (res) {
        console.log('deleted')
        this.inquiry = new SalesOrder();
        this.router.navigate(['inquiry'])

      }
    });
  }

  

  getQty(prodId:string){
    return this.products.find(prod => prod.productId == prodId).qty;
  }

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
    console.log(this.inquiry)

    },
    err => console.log("error fetching inquiries"+err))
  }

  updateItem(item:SelectedItem){
    item.added = false;
  }

  addItemToInquiry(item:SelectedItem){
      
      let orderItem : OrderItem = <OrderItem> new Object();
      orderItem.productId = item.product.productId;
      orderItem.productName = item.product.productName;
      orderItem.productPrice = item.product.productPrice;
      orderItem.available = item.product.qty>item.qtyReq
      if(orderItem.qty == null){
        orderItem.qty = 0;
      }
      orderItem.qty = orderItem.qty + item.qtyReq;
      orderItem.cancelled = false;
      item.added = true

      let oitem = this.orderItems.find(x => x.productName == orderItem.productName)
      if(oitem != null){
        oitem.qty = orderItem.qty;
      }else{
        this.orderItems.push(orderItem);
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
        this.errBool = false
      }else{
        this.errBool = true
        this.customer = new Customer();
        this.errMsg = " Invalid email !!"
      }
      
    },
    err=>{
      this.errBool = true
    })
  }

  getAllCouriers(){
    this.courierService.getAllCouriers().subscribe(couriers => {
      this.couriers = couriers;
      console.log(couriers)
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

    // if(form.orderDate < form.dueDate){
    //   this.errBool = true;
    //   this.errMsg = "Due date must be after the order date !!"
    // } 
    // else if(form.orderDate = "" ||form.dueDate == ""){
    //   this.errBool = true;
    //   this.errMsg = "Due date must be after the order date !!"
    // } 
    // else if(form.customer == null){
    //   console.log(form.customer)
    //   this.errBool = true;
    //   this.errMsg = "Inquiry must have a customer !!"
    // }
    // else if(form.shipmentType == ""|| form.shipmentType == null){
    //   if(form.courier == null){
    //     this.errBool = true;
    //     this.errMsg = "Delivery type not found !!"
    //   }
    // }
    // else if(form.shipmentType == "Courier"){
    //   if(form.courier == null){
    //     this.errBool = true;
    //     this.errMsg = "Courier not found !!"
    //   }
    // }
    // else{
      this.errBool = false;
      this.errMsg = "";
      this.onSubmit(form);
    // }
    console.log(this.errMsg)

  }
}
