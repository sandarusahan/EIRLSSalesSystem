import { SalesOrder } from './SalesOrder';
export class OrderItem {
    orderItemId:string
    salesOrder:SalesOrder
    productId:string
    productName:string
    productPrice:number
    qty:number
    reference:string
    cancelled:boolean
    
}