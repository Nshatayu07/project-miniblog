import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private route = `${environment.apiBaseUrl}/Categories`;
  // private route = `https://localhost:7272/api/Categories`;

  http: HttpClient = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.route);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.route}/${id}`);
  }

  addCategory(data: Category): Observable<Category>{
    return this.http.post<Category>(this.route, data);
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.route}/${id}`, category);
  }

  deleteCategory(id: string): Observable<Category>{
    return this.http.delete<Category>(`${this.route}/${id}`);
  }
}
