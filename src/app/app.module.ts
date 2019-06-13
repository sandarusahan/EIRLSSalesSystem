import { CrudActionsManageService } from './Services/crud-actions-manage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { OrdersComponent } from './orders/orders.component';
import { ReturnsComponent } from './returns/returns.component';
import { UserComponent } from './user/user.component';
import { CrudactionsComponent } from './crudactions/crudactions.component';
import { FormsModule } from '@angular/forms';
import { FindCutomersComponent } from './find-cutomers/find-cutomers.component';
import { MainComponent } from './main/main.component';
import { FindInquiryComponent } from './find-inquiry/find-inquiry.component';
import { FindOrdersComponent } from './find-orders/find-orders.component';
import { FindReturnsComponent } from './find-returns/find-returns.component';
import { CourierComponent } from './courier/courier.component';
import { FindCourierComponent } from './find-courier/find-courier.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CustomersComponent,
    InquiryComponent,
    OrdersComponent,
    ReturnsComponent,
    UserComponent,
    CrudactionsComponent,
    FindCutomersComponent,
    MainComponent,
    FindInquiryComponent,
    FindOrdersComponent,
    FindReturnsComponent,
    CourierComponent,
    FindCourierComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CrudActionsManageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
