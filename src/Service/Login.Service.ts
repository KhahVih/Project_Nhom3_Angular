import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface LoginDTO {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    Id: number;
    UserName: string;
    FullName: string;
    Email: string;
    Role: string;
    IsAdmin: boolean;
  }

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrlAdmin = 'https://localhost:7194/api/Login/admin';
    
    constructor(private http: HttpClient) { }



    /*********************************ADMIN*******************************************/
    loginAdmin(loginData: LoginDTO): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.apiUrlAdmin}/login`, loginData);
    }

    // Lưu thông tin user vào localStorage
    saveUser(user: LoginResponse): void {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }

    // Lấy thông tin user từ localStorage
    getCurrentUser(): LoginResponse | null {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }

    // Kiểm tra xem user có phải admin không
    isAdmin(): boolean {
      const user = this.getCurrentUser();
      return user?.IsAdmin || false;
    }

    // Logout
    logout(): void {
      localStorage.removeItem('currentUser');
    }
  }