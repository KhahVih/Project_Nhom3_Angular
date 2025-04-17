import { Component } from "@angular/core";
import { Contact } from "../../Models/ContactDTO";
import { ContactService } from "../../Service/Contact.Service";
import { LoginService } from "../../Service/Login.Service";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.css'
})
export class AdminContactComponent {
  contacts: Contact[] = [];
  newContact: Contact = this.initNewContact();
  isModalOpen = false;
  isEditing = false;
  showAddForm = false;
  isMenu = true;

  // Pagination
  page: number = 1;
  totalPages: number = 0;

  constructor(
    private contactService: ContactService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  // Khởi tạo đối tượng Contact mặc định
  initNewContact(): Contact {
    return {
      Id: 0,
      Fullname: '',
      Email: '',
      Phonenumber: '',
      Title: '',
      Description: '',
      CreatedAt: new Date()
    };
  }

  // Tải danh sách liên hệ theo trang
  loadContacts(): void {
    this.contactService.getContacts(this.page).subscribe(data => {
      this.contacts = data.Contacts;
      this.totalPages = data.TotalPages;
      this.updateVisiblePages();
      console.log('Response:', data);
    });
  }

  // Thêm liên hệ mới
  addContact(): void {
    this.contactService.createContact(this.newContact).subscribe({
      next: () => {
        this.loadContacts();
        this.resetForm();
        this.showAddForm = false;
      },
      error: (err) => console.error('Lỗi khi thêm liên hệ:', err)
    });
  }

  // Reset form thêm liên hệ
  resetForm(): void {
    this.newContact = this.initNewContact();
    this.isEditing = false;
    this.showAddForm = false;
  }

  // Mở & đóng form thêm liên hệ
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) this.resetForm();
  }

  // Modal xử lý
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmModal(): void {
    this.closeModal();
  }

  // Menu điều hướng
  openMenu(): void {
    this.isMenu = true;
  }

  closeMenu(): void {
    this.isMenu = false;
  }

  // Đăng xuất
  logout(): void {
    this.login.logout();
    this.router.navigate(['admin/login']);
  }

  get isAdmin(): boolean {
    return this.login.isAdmin();
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
      this.loadContacts();
      this.updateVisiblePages()
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadContacts();
      this.updateVisiblePages()
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadContacts();
      this.updateVisiblePages()
    }
  }
}
