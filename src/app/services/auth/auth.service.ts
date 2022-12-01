import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessionServive: SessionService
  ) { }

  isAuthenticated() {
    let isConnected: boolean = false;
    const walletData: any = sessionStorage.getItem('metamask');
    if (walletData) {
      const parseWalletData = JSON.parse(walletData);
      isConnected = parseWalletData.isConnected;
    }
    return isConnected;
  }

  // loggedIn() {
  //   return !!this.sessionServive.getSession('token');
  // }
}
