import { Injectable } from '@angular/core';
import {  CanActivate,  Router} from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public session: SessionService, private _router: Router) { }

  canActivate(): boolean {
    if (this.session.getUser()) {
      return true;
    } else {
      this._router.navigate(['/login'])
      return false;
    }
  }
  
}
