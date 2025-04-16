import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../Models/CustomerDTO";
import { LoginDTO } from "../Models/LoginDTO";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class CustomerService {
    private apiUrl = 'https://localhost:7194/api/Customer';
    constructor(private http: HttpClient, private router: Router){}
    // Lấy danh sách khách hàng
    getCustomer(): Observable<Customer[]>{
        return this.http.get<Customer[]>(this.apiUrl);
    }
    // Lấy khách hàng theo ID
    getCustomerById(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiUrl}/${id}`);
    }

    // Thêm khách hàng mới
    addCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.apiUrl, customer);
    }

    // Cập nhật khách hàng
    updateCustomer(id: number, customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
    }

    // Xóa khách hàng
    deleteCustomer(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Phương thức mới: Đổi mật khẩu
    changePassword(request: { Email: string; OldPassword: string; NewPassword: string }): Observable<any> {
        return this.http.put(`${this.apiUrl}/change-password`, request);
    }

    login(loginData: LoginDTO): Observable<any>{
        return this.http.post<any>(`https://localhost:7194/api/Login/login`, loginData);
    }
    // Lưu customerId vào localStorage
    saveCustomerId(customerId: number): void {
      localStorage.setItem('CustomerId', customerId.toString());
    }
    //luu customername
    saveCustomerName(Name: string): void{
      localStorage.setItem('FullName', Name.toString());
    }
    // Lấy customerId từ localStorage
    getCustomerId(): string | null {
      return localStorage.getItem('CustomerId');
    }
    getCustomerName():string | null{
      return localStorage.getItem('FullName');
    }
    // Xóa customerId khỏi localStorage (đăng xuất)
    logout(): void {
      localStorage.removeItem('CustomerId');
      localStorage.removeItem('FullName');
      this.router.navigate(['/home']);
    }

}