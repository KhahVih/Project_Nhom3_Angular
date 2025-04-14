import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, of } from "rxjs";
import { Comment } from '../Models/CommentDTO';


@Injectable({
    providedIn: 'root'
  })
export class CommentService {
    private apiBaseUrl = 'https://localhost:7194'; // Thay bằng URL API của bạn
    private commentsUrl = `${this.apiBaseUrl}/api/Comment`;
  
    constructor(private http: HttpClient) {}
  
    getComments(): Observable<Comment[]> {
      const url = `${this.commentsUrl}`;
      return this.http.get<Comment[]>(url).pipe(
        tap(comments => console.log('Fetched comments:', comments)),
        catchError(this.handleError<Comment[]>('getComments', []))
      );
    }
  
    getComment(id: number): Observable<Comment> {
      const url = `${this.commentsUrl}/${id}`;
      return this.http.get<Comment>(url).pipe(
        tap(comment => console.log('Fetched comment:', comment)),
        catchError(this.handleError<Comment>('getComment'))
      );
    }
  
    createComment(comment: Comment): Observable<Comment> {
      return this.http.post<Comment>(this.commentsUrl, comment).pipe(
        tap(newComment => console.log('Created comment:', newComment)),
        catchError(this.handleError<Comment>('createComment'))
      );
    }
  
    updateComment(id: number, comment: Comment): Observable<void> {
      const url = `${this.commentsUrl}/${id}`;
      return this.http.put<void>(url, comment).pipe(
        tap(() => console.log(`Updated comment ID=${id}`)),
        catchError(this.handleError<void>('updateComment'))
      );
    }
  
    deleteComment(id: number): Observable<void> {
      const url = `${this.commentsUrl}/${id}`;
      return this.http.delete<void>(url).pipe(
        tap(() => console.log(`Deleted comment ID=${id}`)),
        catchError(this.handleError<void>('deleteComment'))
      );
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
  }
  