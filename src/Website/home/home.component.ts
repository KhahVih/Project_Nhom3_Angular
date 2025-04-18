import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, PLATFORM_ID, Inject  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../Models/ProductDTO';
import { ProductService } from '../../Service/Product.Service';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../Service/Customer.Service';
import { isPlatformBrowser } from '@angular/common';
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

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('reviewSlider') reviewSlider!: ElementRef; // Reference to the slider element
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  @ViewChild('banner', { static: false }) banner!: ElementRef;
  constructor(
    private productService: ProductService, 
    private router: Router, 
    private customerService: CustomerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}

    email: string = 'Ducpham.ms@gmail.com';
    products: Product [] = [];
    productdetail: any;
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
  async ngOnInit(): Promise<void> {
    this.LoadProduct();
    this.checkLoginStatus();
    //this.startSlideshow();
    // Trong ngOnInit hoặc nơi khởi tạo WOW:
    // Trong file main.ts hoặc ngOnInit của component
    if (isPlatformBrowser(this.platformId)) {
      new (window as any).WOW({
        boxClass: 'wow', // class apply cho phần tử
        animateClass: 'animate__animated', // class animation
        offset: 100, // giống data-wow-offset
        mobile: true, // kích hoạt trên di động
        live: true, // theo dõi DOM thay đổi
        callback: function(box: any) {
          // Có thể log khi chạy
        },
        resetAnimation: false // ✅ CHO PHÉP CHẠY LẠI
      }).init();
    }

  }

  ngAfterViewInit(): void {
    // Lấy tất cả phần tử có class "slide" trong banner
    this.slides = Array.from(this.banner.nativeElement.querySelectorAll('.slide'));
    this.startSlideshow(); // Bắt đầu sau khi slides đã được lấy
  }

  ngOnDestroy(): void {
    
  }
  // Loading sản phẩm 
  LoadProduct(){
    this.productService.GetProducts(this.page).subscribe(data =>{
      this.products = data.Products;
      console.log('Response: ', data);
    })
  }
  GetProductDetail(Id: number){
    this.productService.GetProductId(Id).subscribe(data =>{
      this.productdetail = data;
      console.log('ProductDetail: ',data)
    })
  }

  startSlideshow() {
    setInterval(() => {
      this.nextSlide();
    }, this.intervalTime);
  }

  prevSlide(): void {
    if (this.slides.length === 0) return;
    this.slides[this.currentIndex]?.classList.remove('active');
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.slides[this.currentIndex]?.classList.add('active');
  }
  
  nextSlide(): void {
    if (this.slides.length === 0) return;
    this.slides[this.currentIndex]?.classList.remove('active');
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.slides[this.currentIndex]?.classList.add('active');
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
    const customerId = this.customerService.getCustomerId();
    const customerName = this.customerService.getCustomerName();
    this.isLoggedIn = !!customerId;
    this.customerName = customerName;
  }

  // Đăng xuất
  logout(): void {
    this.customerService.logout();
    this.isLoggedIn = false;
  }
}
