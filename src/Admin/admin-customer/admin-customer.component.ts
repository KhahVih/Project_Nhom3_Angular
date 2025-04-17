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
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin-customer.component.html',
  styleUrl: './admin-customer.component.css'
})
export class AdminCustomerComponent {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;

  // Modal và form
  showAddModal = false;
  showChangePasswordModal = false;
  newCustomer: Customer = this.getEmptyCustomer();
  changePasswordRequest: ChangePassword = this.getEmptyPasswordRequest();

  // Phân trang
  page: number = 1;
  totalPages: number = 0;

  // Menu
  isMenu = true;
  openMenu() { this.isMenu = true; }
  closeMenu() { this.isMenu = false; }

  constructor(private customerService: CustomerService, private login: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Tải danh sách khách hàng có phân trang
  loadCustomers(): void {
    this.customerService.getCustomer(this.page).subscribe(data => {
      this.customers = data.Customers;
      this.totalPages = data.TotalPages;
      this.updateVisiblePages();
      console.log('Response:', data);
    });
  }

  // Mở modal
  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.resetNewCustomer();
  }

  addCustomer(): void {
    this.customerService.addCustomer(this.newCustomer).subscribe(() => {
      this.loadCustomers();
      this.closeAddModal();
    });
  }

  editCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customerService.updateCustomer(this.selectedCustomer.Id, this.selectedCustomer).subscribe(() => {
        this.loadCustomers();
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

  closeEditModal(): void {
    this.selectedCustomer = null;
  }

  // Đổi mật khẩu
  openChangePasswordModal(): void {
    this.showChangePasswordModal = true;
  }

  closeChangePasswordModal(): void {
    this.showChangePasswordModal = false;
    this.resetChangePasswordForm();
  }

  changePassword(): void {
    const { Email, OldPassword, NewPassword } = this.changePasswordRequest;
    if (!Email || !OldPassword || !NewPassword) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    this.customerService.changePassword(this.changePasswordRequest).subscribe({
      next: () => {
        this.loadCustomers();
        setTimeout(() => this.closeChangePasswordModal(), 2000);
      }
    });
  }

  visiblePages: number[] = [];
  updateVisiblePages(): void {
    const maxVisible = 5; // Số trang hiển thị tối đa
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.page - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }
  // Phân trang
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.loadCustomers();
      this.updateVisiblePages()
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCustomers();
      this.updateVisiblePages()
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCustomers();
      this.updateVisiblePages()
    }
  }

  // Reset form
  resetNewCustomer(): void {
    this.newCustomer = this.getEmptyCustomer();
  }

  resetChangePasswordForm(): void {
    this.changePasswordRequest = this.getEmptyPasswordRequest();
  }

  getEmptyCustomer(): Customer {
    return {
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

  getEmptyPasswordRequest(): ChangePassword {
    return {
      Email: '',
      OldPassword: '',
      NewPassword: ''
    };
  }

  // Đăng xuất
  logout() {
    this.login.logout();
    this.router.navigate(['admin/login']);
  }

  get isAdmin(): boolean {
    return this.login.isAdmin();
  }
}
