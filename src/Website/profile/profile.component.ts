import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../Service/Customer.Service';
import { Customer } from '../../Models/CustomerDTO';
import { Order } from '../../Models/OrderDTO';
import { OrderService } from '../../Service/Order.Service';
import Swal from 'sweetalert2';

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
  

  // update 
  updateCustomer(){
    const customerId = this.customerService.getCustomerId();
    if(this.isPassword){
      this.customer.Password = this.newPassword;
      console.log('newpassword',this.customer.Password);
    }else {
      console.log('Không đổi mật khẩu, giữ nguyên mật khẩu cũ:', this.customer.Password);
    }
    
    const updateCustomers: Customer = {
      Id: this.customer.Id,
      Username: this.customer.Username,
      Email: this.customer.Email,
      Fullname: this.customer.Fullname,
      Password: this.customer.Password,
      Address: this.customer.Address,
      Phone: this.customer.Phone,
      Gender: this.customer.Gender,
      IsClone: this.customer.IsClone,
      CreatedAt: this.customer.CreatedAt,
      Date: this.customer.Date,
      CommentCount: this.customer.CommentCount
    };
    if(customerId){
      const Id = Number(customerId);
      this.customerService.updateCustomer(Id, updateCustomers).subscribe(() =>{
        Swal.fire({
                icon: 'success', // Biểu tượng thành công
                title: 'Thành công',
                text: 'Cập nhật thành công vui lòng đăng nhập lại!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                toast: true, // Hiển thị dạng toast (góc trên)
                position: 'top-end', // Vị trí góc trên bên phải
                timer: 3000, // Tự đóng sau 3 giây
                timerProgressBar: true, // Thanh tiến trình
              });
        this.isPassword = false;
        this.router.navigate(['/login']);
      })
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
