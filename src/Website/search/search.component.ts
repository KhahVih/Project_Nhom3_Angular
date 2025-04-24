import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Service/Product.Service';
import { Product } from '../../Models/ProductDTO';
import { Category } from '../../Models/CategoryDTO';
import { Sale } from '../../Models/SaleDTO';
import { SaleService } from '../../Service/Sale.Service';
import { Categoryservice } from '../../Service/Category.Service';
import { CustomerService } from '../../Service/Customer.Service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('navbar', { static: false }) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  // Tìm kiếm & trạng thái
  searchQuery: string = '';
  isSearchVisible: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  // Dữ liệu
  products: Product[] = [];
  categories: Category[] = [];
  sales: Sale[] = [];

  // Phân trang
  page: number = 1;
  totalPages: number = 1;
  totalProducts: number = 0;
  
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

  constructor(
    private productService: ProductService,
    private categoryService: Categoryservice,
    private saleService: SaleService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
    this.loadSale();
    this.checkLoginStatus();
    this.loadProductsFromQuery();
  }

  // Xử lý dữ liệu tìm kiếm từ query param
  loadProductsFromQuery(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.productService.GetProductSearch(this.searchQuery, this.page).subscribe(data => {
          this.products = data.Products;
          this.totalPages = data.TotalPages;
          this.totalProducts = data.TotalProduct;
          this.isLoading = false;
          console.log('Response: ', data)
        });
      } else {
        this.loadFilteredProducts(); // Nếu không có từ khóa, load theo trạng thái lọc
      }
    });
    
  }

  // Xử lý lọc/sắp xếp
  loadFilteredProducts(): void {
    this.isLoading = true;

    if (this.selectedSaleId) {
      this.productService.GetProductSaleId(this.selectedSaleId, this.page).subscribe(data => this.handleProductResponse(data));
    } else if (this.selectedCategoryId) {
      this.productService.GetProductCategoryId(this.selectedCategoryId, this.page).subscribe(data => this.handleProductResponse(data));
    } else {
      switch (this.selectedSortType) {
        case 2:
          this.productService.GetProductNew(this.page).subscribe(data => this.handleProductResponse(data));
          break;
        case 3:
          this.productService.GetProductOld(this.page).subscribe(data => this.handleProductResponse(data));
          break;
        case 4:
          this.productService.GetProductPriceASC(this.page).subscribe(data => this.handleProductResponse(data));
          break;
        case 5:
          this.productService.GetProductPriceASDC(this.page).subscribe(data => this.handleProductResponse(data));
          break;
        default:
          this.productService.GetProductSale(this.page).subscribe(data => this.handleProductResponse(data));
      }
    }
  }

  handleProductResponse(data: any): void {
    this.products = data.Products;
    this.totalPages = data.TotalPages;
    this.isLoading = false;
    console.log('Response:', data);
  }

  // Lọc
  GetProductSaleId(Id: number): void {
    this.selectedSaleId = Id;
    this.selectedCategoryId = null;
    this.page = 1;
    this.loadFilteredProducts();
  }

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
    this.loadFilteredProducts();
  }

  // Phân trang
  goToPage(p: number): void {
    if (p >= 1 && p <= this.totalPages && p !== this.page) {
      this.page = p;
      this.loadFilteredProducts();
    }
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

  // UI toggle
  toggleCategory(): void {
    this.isNewProductExpanded = !this.isNewProductExpanded;
  }

  toggleSale(): void {
    this.isSaleExpanded = !this.isSaleExpanded;
  }

  toggleMenu(): void {
    this.navbar.nativeElement.classList.toggle('active');
  }

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

  // Đăng nhập
  checkLoginStatus(): void {
    const customerId = this.customerService.getCustomerId();
    this.isLoggedIn = !!customerId;
    this.customerName = this.customerService.getCustomerName();
  }

  logout(): void {
    this.customerService.logout();
    this.isLoggedIn = false;
  }

  // Load danh mục & khuyến mãi
  loadCategory(): void {
    this.categoryService.GetCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadSale(): void {
    this.saleService.GetSale().subscribe(data => {
      this.sales = data;
    });
  }
}
