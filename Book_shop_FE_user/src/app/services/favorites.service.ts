import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Favorites } from '../common/Favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  url = 'http://localhost:8080/api/favorites';

  constructor(private httpClient: HttpClient) { }

  totalFavoritesItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  $data: Observable<number> = this.totalFavoritesItems.asObservable();

  setLength(total:number) {
    this.totalFavoritesItems.next(total);
  }

  post(favorites: Favorites) {
    return this.httpClient.post(this.url+'/email', favorites);
  }

  getByEmail(email : string) {
    return this.httpClient.get(this.url+'/email/'+ email);
  }

  getByProductIdAndEmail(productId: number, email: string) {
    return this.httpClient.get(this.url+'/'+productId+'/'+email);
  }

  getByProduct(id: number) {
    return this.httpClient.get(this.url+'/product/'+ id);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url+'/'+id)
  }
}
