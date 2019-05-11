import { SalesOrder } from "./SalesOrder";

export class Customer {
    customerId:string;
    customerName:string;
    customerEmail:string;
    customerMainLocation:string;
    customerDeliveryLocation:string;
    customerCollectionLocation:string;
    customerTelephone:string;
    customerType:string;
    customerPaymentFlag:CustomerPaymentStatus = CustomerPaymentStatus.CLEAR
    salesOrders: SalesOrder[];

}

enum CustomerPaymentStatus {
    CLEAR,
    BLOCKED,
    PENDING
}
