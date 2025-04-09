import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Image } from '../Models/ImageDTO';

@Injectable({
  providedIn: 'root'
})
export class Imageservices {
  private apiBaseUrl = 'https://localhost:7194'; // URL base của API
  private imagesUrl = `${this.apiBaseUrl}/api/Images/GetAllImages`; // URL cho endpoint images
  private uploadUrl = `${this.apiBaseUrl}/api/Images/uploadImages`; // URL cho upload

  constructor(private http: HttpClient) { }

  // Hàm lấy tất cả ảnh
  GetAllImages(page: number): Observable<any> {
    return this.http.get<any>(`${this.imagesUrl}?page=${page}`)
  }

  // Hàm upload nhiều ảnh
  UploadImages(files: File[]): Observable<Image[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name); // Key 'files' để gửi nhiều file
    });

    return this.http.post<Image[]>(this.uploadUrl, formData).pipe(
      map(images => images.map(image => ({
        ...image,
        Link: image.Link.startsWith('http') ? image.Link : `${this.apiBaseUrl}${image.Link}` // Chuẩn hóa Link
      }))),
      tap(responses => console.log('Images uploaded:', responses)),
      catchError(this.handleError<Image[]>('uploadImages', []))
    );
  }

  // Xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
