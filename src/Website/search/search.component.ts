import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../Service/Product.Service';
import { Product } from '../../Models/ProductDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../Models/CategoryDTO';
import { SaleService } from '../../Service/Sale.Service';
import { Categoryservice } from '../../Service/Category.Service';
import { Sale } from '../../Models/SaleDTO';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  email: string = 'Ducpham.ms@gmail.com';
  searchQuery: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  categories: Category [] = [];
  selectedCategory: string = "Sản phẩm mới";
  isNewProductExpanded: boolean = true;
  isSaleExpanded: boolean = true;
  TotalProduct: number = 0;
  constructor(
    private router: ActivatedRoute, 
    private productService: ProductService, 
    private categoryService: Categoryservice,
    private saleService: SaleService,
    private route: Router){}
  products: Product [] = [];
  page: number = 1
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategory();
    this.loadSale();
    this.checkLoginStatus();
  }
  //
  loadProducts(){
    this.router.queryParams.subscribe(params =>{
      this.searchQuery = params['q'] || '';
      if(this.searchQuery){
        this.productService.GetProductSearch(this.searchQuery, this.page).subscribe(data =>{
          this.products = data.Products;
          this.TotalProduct = data.TotalProduct;
          console.log('Products: ',data);
        });
      }
    });
  }
  //loadsale
    sales: Sale [] = [];
    loadSale(): void{
      this.saleService.GetSale().subscribe(data =>{
        this.sales = data;
        console.log('Sale: ', data);
      });
    }
    //getproductsaleid
    GetProductSaleId(Id: number){
      this.productService.GetProductSaleId(Id, this.page).subscribe(data =>{
        this.products = data.Products;
        this.TotalProduct = data.TotalProduct;
        console.log('Response: ', data);
      });
    }
    //getproductcategoryId
    GetProductCategoryId(Id: number){
      this.productService.GetProductCategoryId(Id, this.page).subscribe(data =>{
        this.products = data.Products;
        this.TotalProduct = data.TotalProduct;
        console.log('Response: ', data);
      })
    }
    //loadcategory
    loadCategory(): void{
      this.categoryService.GetCategories().subscribe(data => {
        this.categories = data;
        console.log('category: ', data);
      });
    }
    //
    selectSort: any = 1;
    sortProducts(): void {
      if(this.selectSort == 1){
        this.loadProducts();
      }
      if( this.selectSort == 2){
        this.productService.GetProductNew(this.page).subscribe(data =>{
          this.products = data.Products;
          this.page = data.TotalPages;
          this.TotalProduct = data.TotalProduct;
          console.log('Response: ', data);
        });
      }
      if( this.selectSort == 3){
        this.productService.GetProductOld(this.page).subscribe(data =>{
          this.products = data.Products;
          this.page = data.TotalPages;
          this.TotalProduct = data.TotalProduct;
          console.log('Response: ', data);
        });
      }
      if( this.selectSort == 4){
        this.productService.GetProductPriceASC(this.page).subscribe(data =>{
          this.products = data.Products;
          this.page = data.TotalPages; 
          this.TotalProduct = data.TotalProduct; 
          console.log('Response: ', data);
        });
      }
      if( this.selectSort == 5){
        this.productService.GetProductPriceASDC(this.page).subscribe(data =>{
          this.products = data.Products;
          this.page = data.TotalPages;
          this.TotalProduct = data.TotalProduct;
          console.log('Response: ', data);
        });
      }
      
    }
  toggleCategory(): void {
    this.isNewProductExpanded = !this.isNewProductExpanded;
  }

  toggleSale(): void {
    this.isSaleExpanded = !this.isSaleExpanded;
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
      this.route.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.toggleSearch(); // Ẩn thanh tìm kiếm sau khi tìm

    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm!');
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
    this.route.navigate(['/home']);
  }
}
