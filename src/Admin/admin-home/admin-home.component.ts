import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Service/Product.Service';
import { Product } from '../../Models/ProductDTO';
import { Category } from '../../Models/CategoryDTO';
import { Categoryservice } from '../../Service/Category.Service';
import { Image } from '../../Models/ImageDTO';
import { Imageservices } from '../../Service/Image.Service';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { OrderService } from '../../Service/Order.Service';
import { BaseChartDirective } from 'ng2-charts';

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);


const summaryData = [
  { title: "Tổng sản phẩm", value: 320 },
  { title: "Tổng danh mục", value: 24 },
  { title: "Tổng hình ảnh", value: 1250 },
];
interface RevenueByMonth {
  month: number;
  revenue: number;
}

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,BaseChartDirective],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  products: Product[] = [];
  totalProduct: number = 0;
  totalCategory: number = 0;
  categories: Category[] = [];
  images: Image[] = [];                 // Danh sách ảnh
  totalImages: number = 0;             // Tổng số ảnh
  totalPages: number = 0;
  page: number = 1;
  revenueData: any[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Doanh thu (VNĐ)',
        backgroundColor: '#42A5F5'
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };



  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  constructor(private login: LoginService, private router: Router,
              private productService: ProductService,
              private categoryService: Categoryservice,
              private imageService: Imageservices,
              private orderService: OrderService
  ){}
  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }
  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategorys();
    this.loadImages();
    this.Revenue();
  }

  loadProducts(): void {
    this.productService.GetProducts(this.page).subscribe(data =>{
      this.totalProduct = data.TotalProduct; 
      console.log('Response: ',data.TotalProduct);
    })
  }

  loadCategorys(){
    this.categoryService.GetCategories().subscribe(data =>{
      this.totalCategory = data.length;
      this.categories = data;
    });
  }
  loadImages(): void {
    this.imageService.GetAllImages(this.page).subscribe(data => {
      this.totalImages = data.TotalImage;
      console.log('Response:', data.TotalImage);
    });
  }
  
  Revenue(): void {
    this.orderService.GetRenewByMonth().subscribe(data => {
      const labels = data.map((item: any) => `Tháng ${item.Month}`);
      const revenue = data.map((item: any) => item.Revenue);
      console.log('Dữ liệu doanh thu:', data); // 👉 kiểm tra tại đây
      this.barChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Doanh thu (VND)',
            data: revenue,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };
    });
  }
}
