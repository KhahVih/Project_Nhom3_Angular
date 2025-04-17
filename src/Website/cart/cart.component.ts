import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartItem } from '../../Models/CartDTO';
import { CartService } from '../../Service/Cart.Service';
import { CustomerService } from '../../Service/Customer.Service';
import { AddressService } from '../../Service/Address.Service';
import { CheckOut } from '../../Models/CheckOutDTO';

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
    private authService: CustomerService,
    private addressService: AddressService,
    private customerService: CustomerService,
  ){}
  ngOnInit(): void {
    this.loadCartItems();
    this.checkLoginStatus();
    this.addressService.getProvinces().subscribe(data => {
      this.provinces = data;
    });
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
  // xóa cartitem 
  removeItem(CartId: number): void {
    const CustomerId = this.authService.getCustomerId();
    if(CustomerId){
      this.cartService.deleteCartIteam(CartId).subscribe(data =>{
        console.log('Delete CartItemId: ', CartId);
        console.log(data);
      });
    }
    else{
      // Trường hợp chưa đăng nhập: Xóa item khỏi localStorage
      this.cartItems = this.cartItems.filter((i) => i.Id !== CartId);
      this.cartService.removeLocalCartId(CartId);
    }
  }
  // cập nhật số lượng sản phẩm (tăng)
  increaseQuantity(item: CartItem): void {
    item.Quantity++;
    item.FinalPrice = item.FinalPrice * item.Quantity; // Cập nhật FinalPrice
    this.cartService.updateLocalQuantity(item.Id, item.Quantity); // Cập nhật localStorage
  }
  // cập nhật số lượng sản phẩm (giảm) 
  decreaseQuantity(item: CartItem): void {
      if (item.Quantity > 1) { // Đảm bảo số lượng không nhỏ hơn 1
          item.Quantity--;
          item.FinalPrice = item.FinalPrice * item.Quantity; // Cập nhật FinalPrice
          this.cartService.updateLocalQuantity(item.Id, item.Quantity); // Cập nhật localStorage
      }
  }
  // tổng giá gốc 
  getTotalOriginalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.UnitPrice * item.Quantity, 0);
  }
  // tổng giá giảm 
  getTotalFinalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.FinalPrice * item.Quantity, 0);
  }
  // tổng tiền 
  getTotalDiscount(): number {
    return this.getTotalOriginalPrice() - this.getTotalFinalPrice();
  }
  
  // menu nav 
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
  // Lấy thông tin tỉnh thành, Quận Huyện, Phường Xã.
  provinces: any[] = []; // tỉnh thành phố 
  districts: any[] = []; // quận huyện 
  wards: any[] = []; // phường xã 
  selectedProvinceCode: number = 0;
  selectedDistrictCode: number = 0;
  selectedWardCode: number = 0;
  // tỉnh 
  onProvinceChange() {
    if (this.selectedProvinceCode) {
      this.addressService.getDistricts(this.selectedProvinceCode).subscribe(data => {
        this.districts = data.districts;
        console.log(this.selectedProvinceCode);
        this.wards = []; // reset khi đổi tỉnh
      });
    }
  }
  // quận huyện 
  onDistrictChange() {
    if (this.selectedDistrictCode) {
      this.addressService.getWards(this.selectedDistrictCode).subscribe(data => {
        this.wards = data.wards;
        console.log(this.selectedDistrictCode);
      });
    }
  }
  // checkout form 
  checkoutForm: {
    CustomerName: string;
    Email: string;
    Province: string;
    District: string;
    Wards: string;
    Address: string;
    Phone: string;
    Note: string;
  } = {
    CustomerName: '',
    Address: '', 
    Phone: '' ,
    Email: '', 
    Province: '', 
    District: '', 
    Wards: '',
    Note: '',
  };
  // check out 
  checkout(){
    const CustomerId = this.authService.getCustomerId();
    console.log('Selected codes:', this.selectedProvinceCode, this.selectedDistrictCode, this.selectedWardCode);
    if (this.cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    if (!this.checkoutForm.Address || !this.checkoutForm.Phone || !this.checkoutForm.CustomerName ) {
      alert('Vui lòng nhập đầy đủ thông tin giao hàng!');
      return;
    }
    
    const checkout: CheckOut = {
      CustomerId: CustomerId ? +CustomerId : null,
      CustomerName: this.checkoutForm.CustomerName,
      Email: this.checkoutForm.Email,
      Province: this.provinces.find(p => p.code == this.selectedProvinceCode)?.name,
      District: this.districts.find(d => d.code == this.selectedDistrictCode)?.name,
      Wards: this.wards.find(w => w.code == this.selectedWardCode)?.name,
      Address: this.checkoutForm.Address,
      Phone: this.checkoutForm.Phone,
      Note: this.checkoutForm.Note,
      CartItems: this.cartItems
    };
    console.log('CheckOut: ', checkout);
    this.cartService.checkOut(checkout).subscribe({
      next: (response) => {
        alert('Đơn hàng đã được tạo thành công! Mã đơn hàng: ' + response.orderId);
        if (CustomerId) {
          this.cartItems = []; // Xóa giỏ hàng trên giao diện nếu đã đăng nhập
          this.loadCartItems(); // Tải lại từ API
        } else {
          this.cartService.removeCartFromLocal(); // Xóa localStorage nếu chưa đăng nhập
          this.loadCartItems();
          this.resetForm();
        }
      }
    });
  }
  // resetForm 
  resetForm(){
    this.checkoutForm = {
      CustomerName: '',
      Address: '', 
      Phone: '' ,
      Email: '', 
      Province: '', 
      District: '', 
      Wards: '',
      Note: '',
    };

  }

  // kiểm tra login 
  isLoggedIn: boolean = false;
  customerName: string | null = null;
  // Kiểm tra người dùng đã đăng nhập chưa
  checkLoginStatus(): void {
    const customerId = this.customerService.getCustomerId();
    const customerName = this.customerService.getCustomerName();
    this.isLoggedIn = !!customerId;
    this.customerName = customerName;
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem('CustomerId');
    localStorage.removeItem('CustomerName');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
