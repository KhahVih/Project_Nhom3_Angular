import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../Service/Customer.Service';
import { Customer } from '../../Models/CustomerDTO';
import { Order } from '../../Models/OrderDTO';
import { OrderService } from '../../Service/Order.Service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  searchQuery: string = ''; // Từ khóa tìm kiếm
  // customer
  customer: Customer  = {
    Id: 0,
    Username: '', // Dấu ? biểu thị thuộc tính không bắt buộc (nullable)
    Email: '',
    Password: '',
    Fullname: '',
    Address: '',
    Phone: '',
    Gender: true,
    IsClone: false,
    CreatedAt: new Date,
    Date: new Date,
    CommentCount: 0
  };
  // order
  orders: Order[] = [];
  page: number = 1;
  totalPages: number = 0;
  // change password 
  isPassword: boolean = false;
  newPassword: string = '';
  selectedTab: string = 'profile'; // mặc định hiển thị thông tin cá nhân
  constructor(
    private router: Router, 
    private customerService: CustomerService,
    private orderService: OrderService,
  ){}
  
  ngOnInit(): void {
    this.checkLoginStatus();
    this.GetCustomerId();
    this.GetOrderCustomer();
  }

  GetCustomerId(){
    const customerId = this.customerService.getCustomerId();
    if(customerId){
      this.customerService.getCustomerById(customerId).subscribe(data =>{
        this.customer = data;
        console.log('Response: ', data);
      })
    }
    else{
      console.log('Không tìm thấy customerId!');
    }
  }

  get formattedDate(): string {
    // Kiểm tra nếu customer.Date tồn tại và là một giá trị hợp lệ
    if (this.customer.Date) {
      const date = new Date(this.customer.Date);
      return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
    }
    return ''; // Trả về chuỗi rỗng nếu customer.Date là undefined hoặc không hợp lệ
  }
  
  set formattedDate(value: string) {
    if (this.customer) {
      this.customer.Date = new Date(value);
    }
  }

  toggleMenu() {
    const navbarElement = this.navbar.nativeElement;
    navbarElement.classList.toggle('active');
  }
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.searchQuery = ''; // Reset từ khóa khi đóng
    }
  }
  // open change password 
  changPassword(): void {
    if (!this.newPassword || this.newPassword.trim().length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
  
    // Gọi API hoặc xử lý cập nhật mật khẩu tại đây
    console.log('Mật khẩu mới:', this.newPassword);
  
    // Reset form
    this.isPassword = false;
    this.newPassword = '';
    alert('Đổi mật khẩu thành công!');
  }
  // History Order
  GetOrderCustomer(){
    const customerId = this.customerService.getCustomerId();
    if(customerId){
      this.orderService.GetOrderCustomerId(customerId, this.page).subscribe(data =>{
        this.orders = data.Orders;
        this.totalPages = data.TotalPages;
        console.log('Response: ', data);
      });
    }
    else{
      console.log('Không tìm thấy customerId!');
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
  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
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
    this.customerService.logout();
    this.isLoggedIn = false;
  }
}
