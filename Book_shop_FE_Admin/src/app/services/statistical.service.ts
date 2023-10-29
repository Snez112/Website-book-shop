import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  url = 'http://localhost:8080/api/statistical';

  constructor(private httpClient: HttpClient) { }

  getByMothOfYear(year: number) {
    return this.httpClient.get(this.url + '/' + year);
  }
  
  getInventory() {
    return this.httpClient.get(this.url + '/get-inventory');
  }

  getCountYear() {
    return this.httpClient.get(this.url + '/countYear');
  }

  getRevenueByYear(year: number) {
    return this.httpClient.get(this.url + '/revenue/year/' + year);
  }

  getAllOrderSuccess() {
    return this.httpClient.get(this.url + '/get-all-order-success');
  }

  getStatisticalBestSeller() {
    return this.httpClient.get(this.url + '/get-category-seller');
  }
}
