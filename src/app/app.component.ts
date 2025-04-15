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
        else if (url === '/cart') {
          Action = 'Trang Giỏ Hàng ';
          Description = 'Người dùng đã truy cập trang giỏ hàng ';
          this.activityTracker.trackActivity(Action, Description);
        }
        else if (url.startsWith('/search')) {
          const queryParams = this.router.parseUrl(url).queryParams;
          const query = queryParams['q'];
          Action = 'Trang Tìm kiếm';
          Description = `Người dùng đã truy cập trang tìm kiếm sản phẩm: ${query}`;
          this.activityTracker.trackActivity(Action, Description);
        }
        else if (url === '/recruitment') {
          Action = 'Trang Tuyển dụng ';
          Description = 'Người dùng đã truy cập trang tuyển dụng';
          this.activityTracker.trackActivity(Action, Description);
        }
        else if (url === '/policy') {
          Action = 'Trang Chính Sách  ';
          Description = 'Người dùng đã truy cập trang chính sách';
          this.activityTracker.trackActivity(Action, Description);
        }
        else if (url === '/stores') {
          Action = 'Trang Hệ Thống Cửa Hàng ';
          Description = 'Người dùng đã truy cập trang hệ thông cửu hàng';
          this.activityTracker.trackActivity(Action, Description);
        }
      });
  }
  // {path: '', component: HomeComponent},
  //     {path: 'home', component: HomeComponent},
  //     {path: 'product', component: ProductComponent},
  //     {path: 'product/:id', component: ProductdetailComponent},
  //     {path: 'cart', component: CartComponent},
  //     {path: 'search', component: SearchComponent},
  //     {path:  'recruitment',component: RecruitmentComponent},
  //     {path: 'policy', component: PolicyComponent},
  //     {path: 'stores', component: StoresystemComponent},
  //     {path: 'login', component: LoginComponent},
}
