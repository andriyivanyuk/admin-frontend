import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CategoryService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) {}

  public createCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl + '/category/add-category', category);
  }
}
