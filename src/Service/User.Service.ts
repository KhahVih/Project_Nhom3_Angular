import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7194/api/User'; // Cập nhật API URL nếu cần

  constructor(private http: HttpClient) {}

  // Lấy danh sách Users
  GetUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Lấy User theo ID
  GetUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Tạo User mới
  CreateUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Cập nhật User và quyền
  UpdateUser(user: Partial<User>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${user.Id}`, user);
  }

  // Cập nhật mật khẩu User
  UpdatePassword(id: number, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-password/${id}`, newPassword);
  }

  // Xóa User
  DeleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
