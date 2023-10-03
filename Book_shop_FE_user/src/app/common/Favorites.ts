import { Customer } from "./Customer";
import { Product } from "./Product";

export class Favorites {
    'favoriteId': number;
    'user': Customer;
    'product': Product;

    constructor(id: number, user: Customer, product: Product) {
        this.favoriteId = id;
        this.product = product;
        this.user = user;
    }
}
