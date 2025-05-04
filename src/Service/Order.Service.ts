import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../Models/OrderDTO";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'https://localhost:7194/api/Order'; // Thay đổi URL theo địa chỉ backend của bạn
  
    constructor(private http: HttpClient) { }
    // Lấy danh sách đơn hàng 
    GetAllOrders(page: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/getall?page=${page}`);
    }
    // Lấy đơn hàng theo Id 
    GetOrderId(id: number): Observable<Order[]>{
      return this.http.get<Order[]>(`${this.apiUrl}/getorderbyid/${id}`)
    }
    // Lấy đơn hàng theo người dùng 
    GetOrderCustomerId(id: string, page: number): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/getorderbycustomer/${id}?page=${page}`)
    }
    // Get All Order đã giao /by-statusDelivered1
    GetOrderDelivered(page: number): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/by-statusDelivered${page}`)
    }
    // Cập nhật trạng thái đơn hàng 
    UpdateStatus(id: number, updateData: any): Observable<any>{
      return this.http.put(`${this.apiUrl}/update-status/${id}`,updateData)
    }
    // Xóa đơn hàng 
    DeleteOrder(id: number): Observable<Order[]>{
      return this.http.delete<Order[]>(`${this.apiUrl}/${id}`);
    }
    // Lấy tổng đơn hàng chưa xử lý và đã xử lý 
    GetOrderCountByStatus(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/count-by-status`);
    }
    GetRenewByMonth(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/revenue-by-month`);
    }
}