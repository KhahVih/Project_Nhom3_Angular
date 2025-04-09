import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../Models/PermissionDTO';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = 'https://localhost:7194/api/Permission'; // Thay đổi URL nếu cần
  constructor(private http: HttpClient) {}

  // Lấy danh sách quyền
  GetPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUrl);
  }

  // Lấy một quyền theo ID
  GetPermission(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${this.apiUrl}/${id}`);
  }

  // Thêm mới quyền
  CreatePermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.apiUrl, permission);
  }

  // Cập nhật quyền
  UpdatePermission(permission: Permission): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${permission.Id}`, permission);
  }

  // Xóa quyền
  DeletePermission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
