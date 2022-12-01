import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
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
}
