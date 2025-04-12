import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartItem } from '../../Models/CartDTO';
import { CartService } from '../../Service/Cart.Service';
import { CustomerService } from '../../Service/Customer.Service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  email: string = 'Ducpham.ms@gmail.com';
  searchQuery: string = '';
  cartItems: CartItem [] = [];
  constructor(
    private router: Router, 
    private cartService: CartService,
    private authService: CustomerService
  ){}
  ngOnInit(): void {
    this.loadCartItems();
  }
  
  loadCartItems() {
    const CustomerId = this.authService.getCustomerId();
    if (CustomerId) {
      // Nếu đã đăng nhập, lấy giỏ hàng từ API
      this.cartService.getCart(+CustomerId).subscribe({
        next: (data) => {
          this.cartItems = data.map(item => ({
            ...item,
            ProductName: item.ProductName || 'Không có tên',
            ColorName: item.ColorName || 'Không chọn',
            SizeName: item.SizeName || 'Không chọn'
          }));
          console.log('Cart Items from API:', this.cartItems);
        },
        error: (err) => {
          console.error('Error loading cart from API:', err);
          this.cartItems = this.cartService.getCartFromLocal(); // Fallback về localStorage nếu lỗi
        }
      });
    } else {
      // Nếu chưa đăng nhập, lấy từ localStorage
      this.cartItems = this.cartService.getCartFromLocal().map(item => ({
        ...item,
        ProductName: item.ProductName || 'Không có tên',
        ColorName: item.ColorName || 'Không chọn',
        SizeName: item.SizeName || 'Không chọn'
      }));
      console.log('Cart Items from local storage:', this.cartItems);
    }
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter((i) => i.Id !== item.Id);
    this.cartService.removeFromCart(item.Id).subscribe({
      next: () => console.log(`Removed item ${item.Id}`),
      error: (err) => console.error('Error removing item:', err)
    });
  }
  
  toggleMenu() {
    const navbarElement = this.navbar.nativeElement;
    navbarElement.classList.toggle('active');
  }

  // Bật/tắt thanh tìm kiếm
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.searchQuery = ''; // Reset từ khóa khi đóng
    }
  }

  // Xử lý tìm kiếm
  onSearch() {
    if (this.searchQuery.trim()) {
      // Điều hướng tới trang /search với query param
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.toggleSearch(); // Ẩn thanh tìm kiếm sau khi tìm

    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm!');
    }
  }
}
