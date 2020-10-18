import { LoginComponent } from './login/login.component';
import { CourierComponent } from './courier/courier.component';
import { FindCourierComponent } from './find-courier/find-courier.component';
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
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: DashboardComponent},
  {path:'customers', component: FindCutomersComponent},
  {path: 'customers/:id', component: CustomersComponent},
  {path:'inquiry', component: FindInquiryComponent},
  {path:'inquiry/:id', component: InquiryComponent},
  {path:'orders', component: FindOrdersComponent},
  {path:'orders/:id', component: OrdersComponent},
  {path:'returns', component: FindReturnsComponent},
  {path:'returns/:id', component: ReturnsComponent},
  {path:'courier', component: FindCourierComponent},
  {path:'courier/:id', component: CourierComponent},
  {path:'**', component: NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
