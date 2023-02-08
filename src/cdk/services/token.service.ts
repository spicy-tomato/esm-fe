import { Injectable } from '@angular/core';

const LOCAL_STORAGE_ACCESS_TOKEN = 'access-token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // PUBLIC METHODS
  get(): string | null {
    return window.localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  }

  save(token: string): void {
    window.localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, token);
  }

  clear(): void {
    window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
  }
}
