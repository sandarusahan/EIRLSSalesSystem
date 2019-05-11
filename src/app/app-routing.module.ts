import { CustomerModComponent } from './customer-mod/customer-mod.component';
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
  // {path:'customers/new', component: CustomerModComponent},
  // {path:'customers/:id', component: CustomersComponent},
  {path:'customers', component: FindCutomersComponent, children: [
    {
      path: ':id',
      component: CustomersComponent
      // , children: [
      //   {
      //     path: ':keyword',
      //     component: CustomerModComponent,
      //   }
      // ]
    }
  ]},
  {path:'inquiry', component: FindInquiryComponent},
  {path:'inquiry/:keyword', component: InquiryComponent},
  {path:'orders', component: FindOrdersComponent},
  {path:'orders/:keyword', component: OrdersComponent},
  {path:'users', component: UserComponent},
  {path:'returns', component: FindReturnsComponent},
  {path:'returns/:keyword', component: ReturnsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
