import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  public register(data: {
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  //   public login(data: {
  //     email: string;
  //     password: string;
  //   }): Observable<{ accessToken: string; refreshToken: string }> {
  //     return this.http.post<{ accessToken: string; refreshToken: string }>(
  //       `${this.apiUrl}/login`,
  //       data
  //     );
  //   }
}
