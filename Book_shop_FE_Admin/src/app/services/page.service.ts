import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  pageActive: BehaviorSubject<string> = new BehaviorSubject<string>('dashboard');
  $dataPageActive: Observable<string> = this.pageActive.asObservable();

  setPageActive(pageActive: string) {
    this.pageActive.next(pageActive);
  }

  constructor() { }
}
