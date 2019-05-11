import { Customer } from './Customer';
import { OrderItem } from './OrderItem';
import { Courier } from './Courier';
export class SalesOrder {
    private salesOrderId:string
    private orderDate:Date;
    private orderType:OrderType = OrderType.INQUIRY;
    private orderStatus:OrderStatus = OrderStatus.ACTIVE;
    private customer:Customer;
    private orderItems:OrderItem[];
    private dueDate:Date;
    private shipmentType:string
    private courier:Courier;   
}

enum OrderType {
    INQUIRY,
    ORDER,
    RETURN
}

enum OrderStatus {
    ACTIVE,
    CANCELLED,
    DELIVERED
}