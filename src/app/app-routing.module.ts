import { FindReturnsComponent } from './find-returns/find-returns.component';
import { FindOrdersComponent } from './find-orders/find-orders.component';
import { FindInquiryComponent } from './find-inquiry/find-inquiry.component';
import { FindCutomersComponent } from './find-cutomers/find-cutomers.component';
import { UserComponent } from './user/user.component';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { OrdersComponent } from './orders/orders.component';
import { ReturnsComponent } from './returns/returns.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'customers', component: FindCutomersComponent, children: [
    {
      path: ':id',
      component: CustomersComponent
    }
  ]},
  {path:'inquiry', component: FindInquiryComponent, children:[
    {
      path:':id', 
      component: InquiryComponent
    }
  ]},
  {path:'orders', component: FindOrdersComponent, children: [
    {
      path:':id', 
      component: OrdersComponent
    },

  ]},
  {path:'returns', component: FindReturnsComponent, children:[
    {
      path:':id', 
      component: ReturnsComponent
    }
  ]},
  {path:'users', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
