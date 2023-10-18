import { Customer } from "./Customer";
import { OrderDetail } from "./OrderDetail";
import { Product } from "./Product";

export class Rate {
    'id': number;
    'rating': number;
    'comment': string;
    'rateDate': Date;
    'user': Customer;
    'product': Product;
    'orderDetail': OrderDetail;
}
