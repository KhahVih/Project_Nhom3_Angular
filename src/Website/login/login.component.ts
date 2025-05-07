import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginDTO } from '../../Models/LoginDTO';
import { CustomerService } from '../../Service/Customer.Service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../Models/CustomerDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginDTO = { username: '', password: ''};
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  searchQuery: string = ''; // Từ khóa tìm kiếm
  // Đổi password 
  forgotForm: FormGroup;
  constructor(
    private customerService: CustomerService, 
    private router: Router,
    private fb: FormBuilder,
  ){
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  isResgiter: boolean = false;
  isLogin: boolean = true;
  isPassword: boolean = false;
  label: string = 'Đăng Nhập';

  formCustomer: any = {
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: true || false,
    date: '',
    email: '',
    phone: '',
    address: ''
  };
  
  // đăng nhập
  Login(){
    this.customerService.login(this.loginData).subscribe({
      next: (response) => {
        this.customerService.saveCustomerId(response.customer.Id); // Lưu customerId vào localStorage
        this.customerService.saveCustomerName(response.customer.Fullname);
        Swal.fire({
          icon: 'success', // Biểu tượng thành công
          title: 'Thành công',
          text: 'Đăng nhập thành công!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          toast: true, // Hiển thị dạng toast (góc trên)
          position: 'top-end', // Vị trí góc trên bên phải
          timer: 3000, // Tự đóng sau 3 giây
          timerProgressBar: true, // Thanh tiến trình
        });
        this.router.navigate(['/home']); // Chuyển hướng sau khi đăng nhập thành công
      },
      error: (error) => {
        this.showError(`Mật khẩu hoặc tài khoản không đúng `);
      }
    });
  }
  // Chuyển sang form đăng ký
  goToRegister() {
    this.isResgiter = true;
    this.isLogin = false;
    this.isPassword = false;
    this.label = 'Đăng Ký';
  }
  // Chuyển sang form login
  goToLogin() {
    this.isResgiter = false;
    this.isLogin = true;
    this.isPassword = false;
    this.label = 'Đăng Nhập';
  }
  // Chuyển sang form chang password
  goToChangePassword() {
    this.isResgiter = false;
    this.isLogin = false;
    this.isPassword = true;
    this.label = 'Đổi mật khẩu';
  }

  // Sau khi đăng ký xong, chuyển lại form login
  onRegisterSuccess(form: NgForm) {
    
    // Kiểm tra username đã tồn tại chưa
    this.customerService.CheckUsername(this.formCustomer.username).subscribe(res => {
      if (res.exists) {
        this.showError('Tên tài khoản đã tồn tại! Vui lòng chọn tên khác.');
        return;
      }
    })

    if (this.formCustomer.password.length < 6) {
      this.showError('Mật khẩu phải trên 6 ký tự!');
      return;
    }
  
    if (this.formCustomer.password !== this.formCustomer.confirmPassword) {
      this.showError('Mật khẩu không khớp!');
      return;
    }
    // Kiểm tra email đã tồn tại chưa
    this.customerService.CheckEmail(this.formCustomer.email).subscribe(res => {
      if (res.exists) {
        this.showError('Tên email đã tồn tại! Vui lòng chọn email khác.');
        return;
      }
    })
    if (form.invalid) {
      this.showError('Vui lòng điền đầy đủ thông tin!');
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
      // alert('Đăng ký thành công!');
      Swal.fire({
        icon: 'success', // Biểu tượng thành công
        title: 'Thành công',
        text: 'Đăng ký thành công!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        toast: true, // Hiển thị dạng toast (góc trên)
        position: 'top-end', // Vị trí góc trên bên phải
        timer: 3000, // Tự đóng sau 3 giây
        timerProgressBar: true, // Thanh tiến trình
      });
      this.resetForm()
      this.goToLogin();
      console.log('New Customer: ',newcustomer);
    }, err => {
      this.showError('Đăng ký thất bại!');
    });
  }
  // đổi mật khẩu 
  ChangePassword() {
    if(this.forgotForm.invalid){
      return;
    }
    const formData = this.forgotForm.value;
    this.customerService.changePassword(formData).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success', // Biểu tượng thành công
          title: 'Thành công',
          text: `${res.message}`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          toast: true, // Hiển thị dạng toast (góc trên)
          position: 'top-end', // Vị trí góc trên bên phải
          timer: 3000, // Tự đóng sau 3 giây
          timerProgressBar: true, // Thanh tiến trình
        }),
        this.goToLogin();
      },
      error: (err) => {this.showError(`${err.error.message}`)}
    });
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

  showError(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Lỗi',
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
      toast: true,
      position: 'top-end',
      timer: 3000,
      timerProgressBar: true,
    });
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
