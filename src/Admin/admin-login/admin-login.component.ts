import { Component } from '@angular/core';
import { LoginDTO, LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../Service/Customer.Service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginData: LoginDTO = { username: '', password: ''};

  constructor(private login: LoginService, private router: Router, private customerService: CustomerService) { }
  //user 
  // onSubmit(): void {
  //   this.customerService.login(this.username, this.password).subscribe({
  //     next: (response) => {
  //       this.customerService.saveCustomerId(response.customer.Id); // Lưu customerId vào localStorage
  //       alert(response.message);
  //       this.router.navigate(['/productlist']); // Chuyển hướng sau khi đăng nhập thành công
  //     }
  //   });
  // }
  
  //admin
  onSubmit() {
    this.login.login(this.loginData).subscribe({
      next: (response) => {
        this.login.saveUser(response);
        console.log(response);
        if (response.IsAdmin) {
          this.router.navigate(['/admin/home']);
        } else {
          this.router.navigate(['/admin/home']);
        }
      },
    });
  }

}
