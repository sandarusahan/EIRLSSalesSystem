import { Customer } from './Customer';
import { OrderItem } from './OrderItem';
import { Courier } from './Courier';
export class SalesOrder {
    salesOrderId:string
    orderDate:string;
    orderType:string = 'INQUIRY';
    orderStatus:string = 'ACTIVE';
    customer:Customer;
    orderItems:OrderItem[];
    dueDate:string;
    shipmentType:string
    courier:Courier;   
}

// enum OrderType {
//     INQUIRY,
//     ORDER,
//     RETURN
// }

// enum OrderStatus {
//     ACTIVE,
//     CANCELLED,
//     DELIVERED
// }