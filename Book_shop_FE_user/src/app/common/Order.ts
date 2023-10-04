import { Customer } from "./Customer";

export class Order {
    'ordersId': number;
    'orderDate': Date;
    'amount': number;
    'address': string;
    'phone': string;
    'status': number;
    'user': Customer;
}
