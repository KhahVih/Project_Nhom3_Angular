import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../../Models/ContactDTO';
import { ContactService } from '../../Service/Contact.Service';

@Component({
  selector: 'app-storesystem',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './storesystem.component.html',
  styleUrl: './storesystem.component.css'
})
export class StoresystemComponent implements OnInit{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  searchQuery: string = ''; // Từ khóa tìm kiếm
  constructor(private router: Router, private contactService: ContactService){}
  contacts: Contact[] = [];
  // Biến cho form liên hệ
  contactForm: Contact = {
    Id: 0,
    Fullname: '',
    Address: '',
    Email: '',
    Phonenumber: '',
    Title: '',
    Description: '',
    CreatedAt: new Date()
  };

  ngOnInit(): void {
    this.checkLoginStatus();
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
// Xử lý gửi form liên hệ
  onSubmitContact() {
    this.contactService.createContact(this.contactForm).subscribe({
      next: (contact: Contact) => {
        this.contacts.push(contact);
        this.resetContactForm();
      },
      error: (error) => {
        console.error('Error adding contact:', error);
      }
    });
  }

  // Reset form liên hệ
  resetContactForm() {
    this.contactForm = {
      Id: 0,
      Fullname: '',
      Address: '',
      Email: '',
      Phonenumber: '',
      Title: '',
      Description: '',
      CreatedAt: new Date()
    };
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
    const customerId = localStorage.getItem('CustomerId');
    const customerName = localStorage.getItem('CustomerName');
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
