import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../../Models/ContactDTO';
import { ContactService } from '../../Service/Contact.Service';
import { CustomerService } from '../../Service/Customer.Service';

@Component({
  selector: 'app-storesystem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './storesystem.component.html',
  styleUrls: ['./storesystem.component.css']
})
export class StoresystemComponent implements OnInit {
  @ViewChild('navbar', { static: false }) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  isSearchVisible: boolean = false;
  searchQuery: string = '';
  isLoggedIn: boolean = false;
  customerName: string | null = null;
  contacts: Contact[] = [];

  // Danh sách chi nhánh
  branches = [
    {
      name: 'CHAMY 340 Nguyễn Trãi, Trung Văn',
      address: '340 Nguyễn Trãi, Trung Văn, Nam Từ Liêm, Hà Nội',
      email: '',
      phone: '097 366 16 26',
      imageUrl: 'https://chamygaby.vn/thumbs/100x100x1/upload/news/4401787999270757027617832741712165238405379n-1-2526.jpg'
    },
    {
      name: 'CHAMY PHẠM NGỌC THẠCH',
      address: '106 B4, Phạm Ngọc Thạch, Đống Đa, Hà Nội',
      email: '',
      phone: '0375 957 464',
      imageUrl: 'https://chamygaby.vn/thumbs/100x100x1/upload/news/4401787999270757027617832741712165238405379n-1-2526.jpg'
    },
    {
      name: 'CHAMY CẦU GIẤY',
      address: '172 Cầu Giấy, Hà Nội',
      email: '',
      phone: '0984.183.066',
      imageUrl: 'https://chamygaby.vn/thumbs/100x100x1/upload/news/4401787999270757027617832741712165238405379n-1-2526.jpg'
    },
    {
      name: 'CHAMY NGUYỄN TRÃI, HCM',
      address: '124 Nguyễn Trãi, P.3, Q.5, TP Hồ Chí Minh',
      email: '',
      phone: '0365 543 919',
      imageUrl: 'https://chamygaby.vn/thumbs/100x100x1/upload/news/4401787999270757027617832741712165238405379n-1-2526.jpg'
    },
    {
      name: 'CHAMY LÊ VĂN SỸ',
      address: '524 Lê Văn Sỹ, Quận 3, TP. HCM',
      email: '',
      phone: '',
      imageUrl: 'https://chamygaby.vn/thumbs/100x100x1/upload/news/4401787999270757027617832741712165238405379n-1-2526.jpg'
    },
    {
      name: 'CHAMY THANH HÓA',
      address: '174 Lê Hoàn, P. Lam Sơn, TP. Thanh Hóa',
      email: '',
      phone: '0396 078 638',
      imageUrl: 'https://chamygaby.vn/thumbs/100x100x1/upload/news/4401787999270757027617832741712165238405379n-1-2526.jpg'
    }
  ];

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

  constructor(
    private router: Router,
    private contactService: ContactService,
    private customerService: CustomerService
  ) {}

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
      this.searchQuery = '';
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.toggleSearch();
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm!');
    }
  }

  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  onSubmitContact() {
    this.contactService.createContact(this.contactForm).subscribe({
      next: (contact: Contact) => {
        this.contacts.push(contact);
        alert('Gửi thông tin liên hệ thành công!');
        this.resetContactForm();
      },
      error: (error) => {
        console.error('Error adding contact:', error);
        alert('Có lỗi xảy ra khi gửi thông tin liên hệ.');
      }
    });
  }

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

  checkLoginStatus(): void {
    const customerId = this.customerService.getCustomerId();
    const customerName = this.customerService.getCustomerName();
    this.isLoggedIn = !!customerId;
    this.customerName = customerName;
  }

  logout(): void {
    this.customerService.logout();
    this.isLoggedIn = false;
    this.customerName = null;
    this.router.navigate(['/home']);
  }
}