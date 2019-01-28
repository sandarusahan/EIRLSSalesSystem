import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    CrudactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
