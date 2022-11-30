import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }


  getSession(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  setSessions(keys: { [key: string]: any }): void {
    Object.keys(keys).forEach(key => window.localStorage.setItem(key, keys[key]));
  }

  removeSession(key: string): string | null {
    const currentSession: string | null = window.localStorage.getItem(key);
    window.localStorage.removeItem(key);
    return currentSession;
  }

  removeSessions(): void {
    window.localStorage.clear();
  }
}
