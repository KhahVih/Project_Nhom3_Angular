import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../Models/ProductDTO';
import { ProductService } from '../../Service/Product.Service';
import { Category } from '../../Models/CategoryDTO';
import { Categoryservice } from '../../Service/Category.Service';
import { FormsModule } from '@angular/forms'
import { SaleService } from '../../Service/Sale.Service';
import { Sale } from '../../Models/SaleDTO';
@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
  searchQuery: string = ''; // Từ khóa tìm kiếm
  email: string = 'Ducpham.ms@gmail.com';
  products: Product[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  categories: Category [] = [];
  selectedCategory: string = "Sản phẩm mới";
  isNewProductExpanded: boolean = true;
  isSaleExpanded: boolean = true;

  constructor(
    private productService: ProductService, 
    private categoryService: Categoryservice,
    private saleService: SaleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategory();
    this.loadSale();
  }
  //laodproduct
  page: number = 1
  loadProducts(): void {
    this.isLoading = true;
    this.productService.GetProducts(this.page).subscribe(data =>{
      this.products = data.Products;
      console.log('Response: ', data);
    })
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
      console.log('Response: ', data);
    });
  }
  //getproductcategoryId
  GetProductCategoryId(Id: number){
    this.productService.GetProductCategoryId(Id, this.page).subscribe(data =>{
      this.products = data.Products;
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
        console.log('Response: ', data);
      });
    }
    if( this.selectSort == 3){
      this.productService.GetProductOld(this.page).subscribe(data =>{
        this.products = data.Products;
        this.page = data.TotalPages;
        console.log('Response: ', data);
      });
    }
    if( this.selectSort == 4){
      this.productService.GetProductPriceASC(this.page).subscribe(data =>{
        this.products = data.Products;
        this.page = data.TotalPages;  
        console.log('Response: ', data);
      });
    }
    if( this.selectSort == 5){
      this.productService.GetProductPriceASDC(this.page).subscribe(data =>{
        this.products = data.Products;
        this.page = data.TotalPages;
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
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.toggleSearch(); // Ẩn thanh tìm kiếm sau khi tìm
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm!');
    }
  }
}
