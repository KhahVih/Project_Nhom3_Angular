import { HttpClient } from "@angular/common/http";
import { CartItem } from "../Models/CartDTO";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CartService {
    private apiUrl = 'https://localhost:7194/api/Cart';
    private checkoutapi = 'https://localhost:7194/api/Order/checkout';
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    cart$ = this.cartSubject.asObservable(); // Observable để theo dõi giỏ hàng

    constructor(private http: HttpClient) { }

    // 🛒 Thêm sản phẩm vào giỏ hàng
    addToCart(cartItem: CartItem): Observable<CartItem> {
        return this.http.post<CartItem>(this.apiUrl, cartItem);
    }

    // 🔍 Lấy danh sách giỏ hàng theo `CustomerId`
    getCart(customerId: number): Observable<CartItem[]> {
        return this.http.get<CartItem[]>(`${this.apiUrl}/Customer/${customerId}`);
    }

    // 🔄 Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartItem(cartItemId: number, quantity: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/${cartItemId}`, { quantity });
    }

    // ❌ Xóa sản phẩm khỏi giỏ hàng
    removeFromCart(cartItemId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${cartItemId}`);
    }

    // 🎨 Lấy danh sách màu sắc
    getColor(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/GetColor`);
    }

    // 📏 Lấy danh sách kích thước
    getSize(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/GetSize`);
    }

    // Lấy giỏ hàng từ local storage
  getCartFromLocal(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // Lưu giỏ hàng vào local storage
  saveCartToLocal(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Xóa giỏ hàng trong local storage
  clearCartFromLocal(): void {
    localStorage.removeItem('cart');
  }

  checkOut(checkOutData: CartItem): Observable<any>{
    return this.http.post(`${this.checkoutapi}`, checkOutData);
  }
}
