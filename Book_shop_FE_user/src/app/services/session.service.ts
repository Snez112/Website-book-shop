import { Injectable } from '@angular/core';
import { Email } from '../common/Email';
import { Login } from '../common/Login';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  login!: Login;
  data!: any;

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser(): any {
    try {
      let email:Email = jwt_decode(String(this.getToken())) as Email;
      return email.sub;
    }
    catch (Error) {
      return null;
    }
  }
}
