import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../Models/ProductDTO';
import { ProductService } from '../../Service/Product.Service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  categories: string[] = [
    "Tất cả",
    "VEST/ BLAZER",
    "JUMPSUIT",
    "CHÂN VÁY",
    "ÁO KIỂU",
    "VÁY/ ĐẦM",
    "SƠ MI",
    "SET ÁO + QUẦN",
    "SET ÁO KHOÁC + VÁY",
    "SET ÁO DÀI",
    "SET ÁO + CV",
    "QUẦN SHORT",
    "QUẦN DÀI"
  ];
  selectedCategory: string = "Sản phẩm mới";
  sortOptions: string[] = [
    "Mới nhất",
    "Giá: Thấp đến Cao",
    "Giá: Cao đến Thấp",
    "Bán chạy nhất"
  ];
  selectedSort: string = "Mới nhất";
  isNewProductExpanded: boolean = true;
  isSaleExpanded: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  page: number = 1
  loadProducts(): void {
    this.isLoading = true;
    this.productService.GetProducts(this.page).subscribe(data =>{
      this.products = data.Products;
      console.log('Response: ', data);
    })
  }

  // filterProducts(): void {
  //   this.filteredProducts = this.products.filter(product => {
  //     if (this.selectedCategory === "Sản phẩm mới") {
  //       const createdAt = new Date(product.CreatedAt);
  //       const now = new Date();
  //       const diffTime = Math.abs(now.getTime() - createdAt.getTime());
  //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //       return diffDays <= 30; // Sản phẩm mới trong vòng 30 ngày
  //     }
  //     return product.ProductCategorys === this.selectedCategory || this.selectedCategory === "Tất cả";
  //   });
  //   this.sortProducts();
  // }

  // sortProducts(): void {
  //   switch (this.selectedSort) {
  //     case "Mới nhất":
  //       this.filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  //       break;
  //     case "Giá: Thấp đến Cao":
  //       this.filteredProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "Giá: Cao đến Thấp":
  //       this.filteredProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     case "Bán chạy nhất":
  //       this.filteredProducts.sort((a, b) => b.sold - a.sold);
  //       break;
  //   }
  // }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    //this.filterProducts();
  }

  // onSortChange(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   this.selectedSort = selectElement.value;
  //   this.sortProducts();
  // }

  toggleNewProduct(): void {
    this.isNewProductExpanded = !this.isNewProductExpanded;
  }

  toggleSale(): void {
    this.isSaleExpanded = !this.isSaleExpanded;
  }

  selectDiscount(discount: string): void {
    // Logic để điều hướng hoặc lọc sản phẩm theo mức giảm giá
    console.log(`Selected discount: ${discount}`);
  }

  toggleMenu() {
    const navbarElement = this.navbar.nativeElement;
    navbarElement.classList.toggle('active');
  }
}
