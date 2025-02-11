import { Injectable } from '@angular/core';

@Injectable()
export class TokenStorageService {
  private tokenKey: string = 'auth_token';

  constructor() {}

  public saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  public clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}
