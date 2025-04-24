import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../Models/ProductDTO';
import { ProductService } from '../../Service/Product.Service';
import { Category } from '../../Models/CategoryDTO';
import { Categoryservice } from '../../Service/Category.Service';
import { FormsModule } from '@angular/forms'
import { SaleService } from '../../Service/Sale.Service';
import { Sale } from '../../Models/SaleDTO';
import { CustomerService } from '../../Service/Customer.Service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;

  // Trạng thái
  isSearchVisible: boolean = false;
  searchQuery: string = '';
  email: string = 'Ducpham.ms@gmail.com';
  isLoading: boolean = false;
  error: string | null = null;
  
  // Dữ liệu
  products: Product[] = [];
  categories: Category [] = [];
  sales: Sale [] = [];

  // Phân trang
  page: number = 1;
  totalPages: number = 0;

  // Lọc & sắp xếp
  selectedCategoryId: number | null = null;
  selectedSaleId: number | null = null;
  selectedSortType: number = 1;
  selectSort: number = 1;

  // UI menu
  isNewProductExpanded: boolean = true;
  isSaleExpanded: boolean = true;

  // Đăng nhập
  isLoggedIn: boolean = false;
  customerName: string | null = null;

  selectedCategory: string = "Sản phẩm mới";

  constructor(
    private productService: ProductService, 
    private categoryService: Categoryservice,
    private saleService: SaleService,
    private router: Router,
    private customerService: CustomerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadFilteredProducts();
    this.loadCategory();
    this.loadSale();
    this.checkLoginStatus();
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
  // Hàm chính xử lý tải sản phẩm theo trạng thái lọc
  loadFilteredProducts(): void {
    this.isLoading = true;

    if (this.selectedSaleId) {
      this.productService.GetProductSaleId(this.selectedSaleId, this.page).subscribe(data => {
        this.handleProductResponse(data);
      });
    } else if (this.selectedCategoryId) {
      this.productService.GetProductCategoryId(this.selectedCategoryId, this.page).subscribe(data => {
        this.handleProductResponse(data);
      });
    } else if (this.selectedSortType == 2) {
      this.productService.GetProductNew(this.page).subscribe(data => {
        this.handleProductResponse(data);
      });
    } else if (this.selectedSortType == 3) {
      this.productService.GetProductOld(this.page).subscribe(data => {
        this.handleProductResponse(data);
      });
    } else if (this.selectedSortType == 4) {
      this.productService.GetProductPriceASC(this.page).subscribe(data => {
        this.handleProductResponse(data);
      });
    } else if (this.selectedSortType == 5) {
      this.productService.GetProductPriceASDC(this.page).subscribe(data => {
        this.handleProductResponse(data);
      });
    } else if(this.selectedSortType == 1){
      this.productService.GetProducts(this.page).subscribe(data => {
        this.handleProductResponse(data);
      });
    }
  }

  handleProductResponse(data: any): void {
    this.products = data.Products;
    this.totalPages = data.TotalPages;
    this.isLoading = false;
    this.getPages();
    console.log('Response:', data);
  }
  //load product
  loadProducts(){
    this.productService.GetProducts(this.page).subscribe(data => {
      this.handleProductResponse(data);
    });
  }
  // Phân trang
  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages || p === this.page) return;
    this.page = p;
    this.loadFilteredProducts();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadFilteredProducts();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadFilteredProducts();
    }
  }

  getPages(): number[] {
    const maxDisplayedPages = 5;
    const half = Math.floor(maxDisplayedPages / 2);

    let start = Math.max(1, this.page - half);
    let end = Math.min(this.totalPages, start + maxDisplayedPages - 1);

    // Điều chỉnh nếu đang ở gần cuối danh sách
    if (end - start < maxDisplayedPages - 1) {
      start = Math.max(1, end - maxDisplayedPages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Lọc theo khuyến mãi
  GetProductSaleId(Id: number): void {
    this.selectedSaleId = Id;
    this.selectedCategoryId = null;
    this.page = 1;
    this.loadFilteredProducts();
  }

  // Lọc theo danh mục
  GetProductCategoryId(Id: number): void {
    this.selectedCategoryId = Id;
    this.selectedSaleId = null;
    this.page = 1;
    this.loadFilteredProducts();
  }

  // Sắp xếp
  sortProducts(): void {
    this.page = 1;
    this.selectedSortType = this.selectSort;
    console.log('SelectedSort: ',this.selectedSortType)
    this.loadFilteredProducts();
  }

  // Load dữ liệu sale & category
  loadSale(): void {
    this.saleService.GetSale().subscribe(data => {
      this.sales = data;
      console.log('Sale:', data);
    });
  }

  loadCategory(): void {
    this.categoryService.GetCategories().subscribe(data => {
      this.categories = data;
      console.log('Category:', data);
    });
  }

  // Menu toggle
  toggleCategory(): void {
    this.isNewProductExpanded = !this.isNewProductExpanded;
  }

  toggleSale(): void {
    this.isSaleExpanded = !this.isSaleExpanded;
  }

  toggleMenu(): void {
    const navbarElement = this.navbar.nativeElement;
    navbarElement.classList.toggle('active');
  }

  // Tìm kiếm
  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) this.searchQuery = '';
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.toggleSearch();
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm!');
    }
  }
  // sử lý tìm kiếm theo thời gian thực 
  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }
  // Kiểm tra người dùng đã đăng nhập chưa
  checkLoginStatus(): void {
    const customerId = this.customerService.getCustomerId();
    const customerName = this.customerService.getCustomerName();
    this.isLoggedIn = !!customerId;
    this.customerName = customerName;
  }

  // Đăng xuất
  logout(): void {
    this.isLoggedIn = false;
    this.customerService.logout();
    
  }
}
