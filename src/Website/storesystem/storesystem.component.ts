import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-storesystem',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './storesystem.component.html',
  styleUrl: './storesystem.component.css'
})
export class StoresystemComponent {
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  searchQuery: string = ''; // Từ khóa tìm kiếm
  constructor(private router: Router){}
  // Biến cho form liên hệ
  contactForm = {
    fullName: '',
    phone: '',
    address: '',
    email: '',
    subject: '',
    content: ''
  };


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
    console.log('Thông tin liên hệ:', this.contactForm);
    alert('Gửi thông tin liên hệ thành công!');
    this.resetContactForm();
  }

  // Reset form liên hệ
  resetContactForm() {
    this.contactForm = {
      fullName: '',
      phone: '',
      address: '',
      email: '',
      subject: '',
      content: ''
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
}
