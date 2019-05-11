import { SalesOrder } from './SalesOrder';
export class OrderItem {
    private orderItemId:string
    private salesOrder:SalesOrder
    private productId:string
    private productName:string
    private productPrice:string
    private qty:number
    private reference:string
    private available:boolean
    private cancelled:boolean
    
}