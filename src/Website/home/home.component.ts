import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../Models/ProductDTO';
import { ProductService } from '../../Service/Product.Service';
import { FormsModule } from '@angular/forms';

export interface Review {
  image: string;
  name: string;
  title: string;
  quote: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  @ViewChild('reviewSlider') reviewSlider!: ElementRef; // Reference to the slider element
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;

  constructor(private productService: ProductService, private router: Router){}

  email: string = 'Ducpham.ms@gmail.com';
  products: Product [] = [];
  reviews: Review[] = [
    {
      image: 'https://chamygaby.vn/thumbs/140x140x1/upload/news/44144247621264888177368305473686737407652445n-4052.jpg',
      name: 'CHỊ DUYÊN',
      title: 'GIÁM ĐỐC',
      quote: 'QUẦN ÁO RẤT ĐẸP GIÁ CẢ PHẢI CHĂNG'
    },
    {
      image: 'https://chamygaby.vn/thumbs/140x140x1/upload/news/thiet-ke-chua-co-ten-4-4674.png',
      name: 'CHỊ GIANG',
      title: 'CEO',
      quote: 'SẢN PHẨM RẤT ĐẸP XỨNG ĐÁNG VỚI GIÁ TIỀN'
    },
    {
      image: 'https://chamygaby.vn/thumbs/140x140x1/upload/news/44144247621264888177368305473686737407652445n-4052.jpg',
      name: 'CHỊ DUYÊN',
      title: 'GIÁM ĐỐC',
      quote: 'QUẦN ÁO RẤT ĐẸP GIÁ CẢ PHẢI CHĂNG'
    }
  ];
  duplicatedReviews: Review[] = [];
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  searchQuery: string = ''; // Từ khóa tìm kiếm
  page: number = 1;
  // slider
  slides: HTMLElement [] = [];
  currentIndex: number = 0;
  intervalTime = 5000; // thời gian chuyển slide (3 giây)
  autoSlideInterval: any;
  //
  ngOnInit(): void {
    this.LoadProduct();
    this.checkLoginStatus();
    //this.startSlideshow();
  }

  // Loading sản phẩm 
  LoadProduct(){
    this.productService.GetProducts(this.page).subscribe(data =>{
      this.products = data.Products;
      console.log('Response: ', data);
    })
  }

  startSlideshow() {
    setInterval(() => {
      this.nextSlide();
    }, this.intervalTime);
  }

  nextSlide() {
    // Xóa class active khỏi slide hiện tại
    this.slides[this.currentIndex].classList.remove('active');
    // Tăng index, quay lại 0 nếu đến slide cuối
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    // Thêm class active cho slide tiếp theo
    this.slides[this.currentIndex].classList.add('active');
    console.log('CurrentIndex: ',this.currentIndex);
  }
  // prevslide
  prevSlide() {
    this.slides[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.slides[this.currentIndex].classList.add('active');
  }
  
  toggleMenu() {
    const navbarElement = this.navbar.nativeElement;
    navbarElement.classList.toggle('active');
  }

  // Bật/tắt thanh tìm kiếm
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
