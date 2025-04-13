import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Product } from '../Models/ProductDTO';
import { ProductService } from '../Service/Product.Service';
import { ActivityTrackerService } from '../Service/ActivityTracker.Service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ChamyAngular';
  constructor(
    private router: Router, 
    private activityTracker: ActivityTrackerService, 
    private productService: ProductService){}
  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        let Action = '';
        let Description = '';

        if (url === '/home') {
          Action = 'Trang Home';
          Description = 'Người dùng đã truy cập trang home';
          this.activityTracker.trackActivity(Action, Description);
        }
        else if (url === '/product') {
          Action = 'Trang Sản phẩm';
          Description = 'Người dùng đã truy cập trang sản phẩm';
          this.activityTracker.trackActivity(Action, Description);
        }
        else if (url.startsWith('/product/')) {
          const productId = url.split('/').pop(); // Lấy ID từ URL
          if (productId) {
            this.productService.GetProductId(+productId).subscribe(product => {
              Action = 'Trang chi tiết sản phẩm';
              Description = `Người dùng đã truy cập sản phẩm: ${product.Name}`;
              this.activityTracker.trackActivity(Action, Description);
            });
          }
        }
        
      });
  }
  // {path: '', component: HomeComponent},
  //     {path: 'home', component: HomeComponent},
  //     {path: 'product', component: ProductComponent},
  //     {path: 'product/:id', component: ProductdetailComponent},
  //     {path: 'cart', component: CartComponent},
  //     {path: 'search', component: SearchComponent},
//   Products: Product [] = [];
//   CurrentPage: number = 1;
//   TotalPages: number = 0;
//   TotalProduct: number = 0;
//   constructor(private productsrv: ProductService){}
//   ngOnInit(): void {
//     this.loadProducts(this.CurrentPage);
//   }

//   loadProducts(page: number): void {
//     this.productsrv.GetProducts(page).subscribe(data => {
//         this.Products = data.Products;
//         this.CurrentPage = data.CurrentPage;
//         this.TotalPages = data.TotalPages;
//         this.TotalProduct = data.TotalProduct;
//         console.log('Product: ', this.Products);
//         console.log('CurrentPage: ', this.CurrentPage);
//         console.log('TotalPages: ', this.TotalPages);
//         console.log('TotalProduct: ', this.TotalProduct);
//     });
//   } 

//   nextPage(): void {
//     if (this.CurrentPage < this.TotalPages) {
//         this.CurrentPage++;
//         this.loadProducts(this.CurrentPage);
//     }
// }

//   previousPage(): void {
//     if(this.CurrentPage > 1) {
//         this.CurrentPage--;
//         this.loadProducts(this.CurrentPage);
//     }
//   }
}
