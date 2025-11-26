import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../models/blogpost.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = `${environment.apiBaseUrl}/BlogPost`;

  getBlogposts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.baseUrl);
  }

  getBlogpostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.baseUrl}/${id}`);
  }
  
  getBlogpostByUrl(url: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.baseUrl}/${url}`);
  }

  addBlogpost(data: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.baseUrl, data);
  }

  updateBlogpost(id: string, BlogPost: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.baseUrl}/${id}`, BlogPost);
  }

  deleteBlogpost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${this.baseUrl}/${id}`);
  }
}
