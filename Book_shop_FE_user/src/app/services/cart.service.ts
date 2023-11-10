import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../common/Cart';
import { CartDetail } from '../common/CartDetail';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  urlCart = 'http://localhost:8080/api/cart';
  urlCartDetail = 'http://localhost:8080/api/cartDetail';

  constructor(private httpClient: HttpClient) { }

  totalCartsItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  $data: Observable<number> = this.totalCartsItems.asObservable();

  setLength(total:number) {
    this.totalCartsItems.next(total);
  }

  getAllDetail(cartId:number) {
    return this.httpClient.get(this.urlCartDetail+'/cart/'+cartId);
  }

  getOneDetail(detailId:number) {
    return this.httpClient.get(this.urlCartDetail+'/'+detailId);
  }

  getCart(email: string) {
    return this.httpClient.get(this.urlCart+'/user/'+email);
  }

  updateCart(email:string, cart: Cart) {
    return this.httpClient.put(this.urlCart+'/user/'+email, cart);
  }

  updateDetail(detail: CartDetail) {
    return this.httpClient.put(this.urlCartDetail, detail);
  }

  deleteDetail(detailId:number) {
    return this.httpClient.delete(this.urlCartDetail+'/'+detailId);
  }

  postDetail(detail: CartDetail) {
    return this.httpClient.post(this.urlCartDetail, detail);
  }
}
