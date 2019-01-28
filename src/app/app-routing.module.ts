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
  {path:'customers', component: CustomersComponent},
  {path:'inquiry', component: InquiryComponent},
  {path:'orders', component: OrdersComponent},
  {path:'users', component: UserComponent},
  {path:'returns', component: ReturnsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
