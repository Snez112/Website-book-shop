import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = "http://localhost:8080/api/auth";

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  post(customer: Customer) {
    return this.httpClient.post(this.url, customer);
  }

  getOne(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }

  getByEmail(email: string) {
    return this.httpClient.get(this.url + '/email/' + email);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }

  update(id: number, customer: Customer) {
    return this.httpClient.put(this.url + '/' + id, customer);
  }

  updateAdmin(id: number, customer: Customer) {
    return this.httpClient.put(this.url + '/admin/' + id, customer);
  }
}
