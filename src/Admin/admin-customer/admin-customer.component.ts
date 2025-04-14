import { Component } from '@angular/core';
import { Customer } from '../../Models/CustomerDTO';
import { ChangePassword } from '../../Models/CommentDTO';
import { CustomerService } from '../../Service/Customer.Service';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-customer',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-customer.component.html',
  styleUrl: './admin-customer.component.css'
})
export class AdminCustomerComponent {
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  showAddModal = false;
  showChangePasswordModal = false; // Thêm biến để hiển thị modal đổi mật khẩu
  changePasswordRequest: ChangePassword = {
    Email: '',
    OldPassword: '',
    NewPassword: ''
  };
  newCustomer: Customer = {
    Id: 0,
    Username: '',
    Email: '',
    Password: '',
    Fullname: '',
    Address: '',
    Phone: '',
    Gender: true,
    IsClone: false,
    CreatedAt: new Date(),
    Date: new Date(),
    CommentCount: 0,
  };

  constructor(private customerService: CustomerService, private login: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomer().subscribe(data => {
      this.customers = data;
      console.log(data);
    });
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.resetNewCustomer();
  }

  addCustomer(): void {
    this.customerService.addCustomer(this.newCustomer).subscribe(customer => {
      this.customers.push(customer);
      this.loadCustomers();
      this.closeAddModal();
    });
  }

  editCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
  }

  closeEditModal(): void {
    this.selectedCustomer = null;
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customerService.updateCustomer(this.selectedCustomer.Id, this.selectedCustomer).subscribe(() => {
        const index = this.customers.findIndex(c => c.Id === this.selectedCustomer!.Id);
        //this.customers[index] = { ...this.selectedCustomer };
        this.loadCustomers()
        this.closeEditModal();
      });
    }
  }

  deleteCustomer(id: number): void {
    if (confirm('Bạn có chắc muốn xóa khách hàng này?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.customers = this.customers.filter(c => c.Id !== id);
      });
    }
  }

  resetNewCustomer(): void {
    this.newCustomer = {
      Id: 0,
      Username: '',
      Email: '',
      Password: '',
      Fullname: '',
      Address: '',
      Phone: '',
      Gender: true,
      IsClone: false,
      CreatedAt: new Date(),
      Date: new Date(),
      CommentCount: 0,
    };
  }

  // Logic cho đổi mật khẩu
  openChangePasswordModal(): void {
    this.showChangePasswordModal = true;
  }

  closeChangePasswordModal(): void {
    this.showChangePasswordModal = false;
    this.resetChangePasswordForm();
  }
  changePassword(): void {
    if(!this.changePasswordRequest.Email || !this.changePasswordRequest.OldPassword || !this.changePasswordRequest.NewPassword){
      alert('Vui lòng nhập đầy đủ thông tin')
    }
    this.customerService.changePassword(this.changePasswordRequest).subscribe({
      next: (response) => {
        console.log(response) // "Mật khẩu đã được cập nhật thành công"
        setTimeout(() => this.closeChangePasswordModal(), 2000); // Đóng modal sau 2 giây
        this.loadCustomers();
      },
    });
  }
  resetChangePasswordForm(): void {
    this.changePasswordRequest = {
      Email: '',
      OldPassword: '',
      NewPassword: ''
    };
  }

  logout(){
    this.login.logout();
    this.router.navigate(['/login']);
  }
  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

}
