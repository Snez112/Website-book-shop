import { Order } from "./Order";
import { Product } from "./Product";

export class OrderDetail {
    'orderDetailId':number;
    'quantity':number;
    'price':number;
    'product':Product;
    'order':Order;

    constructor(id: number) {
        this.orderDetailId = id;
    }
}
