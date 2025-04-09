import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Category } from '../Models/CategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class Categoryservice {
  private apiBaseUrl = 'https://localhost:7194'; // URL base của API
  private categoriesUrl = `${this.apiBaseUrl}/api/Category`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  // Lấy danh sách danh mục 
  GetCategories(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }
  // Thêm sanh mục 
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions).pipe(
      tap(newCategory => console.log(`Added category`, newCategory)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }
  // Cập nhật danh mục 
  updateCategory(id: number, category: Category): Observable<any> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.put(url, category, this.httpOptions).pipe(
      tap(_ => console.log(`Updated category id=${id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }
  // Xóa danh mục 
  deleteCategory(id: number): Observable<{}> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deleted category id=${id}`)),
      catchError(this.handleError<{}>('deleteCategory'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
