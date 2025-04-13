import { HttpClient } from "@angular/common/http";
import { CartItem } from "../Models/CartDTO";
import { BehaviorSubject, identity, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Product } from "../Models/ProductDTO";
import { CheckOut } from "../Models/CheckOutDTO";

@Injectable({
    providedIn: 'root'
  })
export class CartService {
    private apiUrl = 'https://localhost:7194/api/Cart';
    private checkoutapi = 'https://localhost:7194/api/Order/checkout';
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    cart$ = this.cartSubject.asObservable(); // Observable để theo dõi giỏ hàng

    constructor(private http: HttpClient) { }
  // API 
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
    // Delete 
    deleteCartIteam(Id: number): Observable<any>{
      return this.http.delete(`${this.apiUrl}/${Id}`)
    }

    //local 
    // Lấy giỏ hàng từ local storage
    getCartFromLocal(): CartItem[] {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    // Cập nhật số lượng sản phẩm trong localStorage
    updateLocalQuantity(cartItemId: number, newQuantity: number): void {
      let cart = this.getCartFromLocal();
      const itemIndex = cart.findIndex((item) => item.Id === cartItemId);
      
      if (itemIndex !== -1) {
          // Cập nhật số lượng (đảm bảo số lượng tối thiểu là 1)
          cart[itemIndex].Quantity = Math.max(1, newQuantity);
          // Cập nhật FinalPrice
          cart[itemIndex].FinalPrice = cart[itemIndex].UnitPrice * cart[itemIndex].Quantity;
          this.saveCartToLocal(cart);
          console.log(`Updated quantity for cart item ${cartItemId} to ${cart[itemIndex].Quantity} in localStorage`);
      } else {
          console.warn(`Cart item ${cartItemId} not found in localStorage`);
      }
    }
    // Xóa 1 sản phẩm duy nhất khỏi giỏ hàng trong localStorage
    removeLocalCartId(cartItemId: number): void {
      let cart = this.getCartFromLocal();
      const itemIndex = cart.findIndex((item) => item.Id === cartItemId);
      
      if (itemIndex !== -1) {
          // Xóa chỉ mục tìm thấy
          cart.splice(itemIndex, 1);
          this.saveCartToLocal(cart);
          console.log(`Removed CartId ${cartItemId} from localStorage`);
      } else {
          console.warn(`Cart item ${cartItemId} not found in localStorage`);
      }
    }
    // Lưu giỏ hàng vào local storage
    saveCartToLocal(cart: CartItem[]): void {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Xóa giỏ hàng trong local storage
    removeCartFromLocal(): void {
      localStorage.removeItem('cart');
    }

    checkOut(checkOutData: CheckOut): Observable<any>{
      return this.http.post(`${this.checkoutapi}`, checkOutData);
    }
}
