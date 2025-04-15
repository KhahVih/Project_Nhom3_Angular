import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginDTO } from '../../Models/LoginDTO';
import { CustomerService } from '../../Service/Customer.Service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Customer } from '../../Models/CustomerDTO';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginDTO = { username: '', password: ''};
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  searchQuery: string = ''; // Từ khóa tìm kiếm
  constructor(private customerService: CustomerService, private router: Router){}
  isResgiter: boolean = false;
  label: string = 'Đăng Nhập';

  formCustomer: any = {
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: true,
    date: '',
    email: '',
    phone: '',
    address: ''
  };


  Login(){
    this.customerService.login(this.loginData).subscribe({
      next: (response) => {
        this.customerService.saveCustomerId(response.customer.Id); // Lưu customerId vào localStorage
        alert(response.message);
        this.router.navigate(['/home']); // Chuyển hướng sau khi đăng nhập thành công
      }
    });
  }

  // Chuyển sang form đăng ký
  goToRegister() {
    this.isResgiter = true;
    this.label = 'Đăng Ký';
  }

  // Sau khi đăng ký xong, chuyển lại form login
  onRegisterSuccess(form: NgForm) {
    
    if(form.invalid){
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    if (this.formCustomer.password !== this.formCustomer.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    const newcustomer: Customer = {
      Id: 0,
      Username: this.formCustomer.username,
      Email: this.formCustomer.email,
      Password: this.formCustomer.password,
      Fullname: this.formCustomer.fullname,
      Gender: this.formCustomer.gender,
      Address: this.formCustomer.address,
      Phone: this.formCustomer.phone,
      IsClone: false,
      CreatedAt: new Date(),
      Date: new Date(this.formCustomer.date),
      CommentCount: 0
    };
    this.customerService.addCustomer(newcustomer).subscribe(res =>{
      alert('Đăng ký thành công!');
      this.resetForm()
      console.log('New Customer: ',newcustomer);
    }, err => {
      alert('Đăng ký thất bại!');
    });
    this.isResgiter = false;
    this.label = 'Đăng Nhập';
  }
  resetForm(){
    this.formCustomer = {
      fullname: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: true,
      date: '',
      email: '',
      phone: '',
      address: ''
    };
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
}
