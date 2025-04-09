import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../Models/ProductDTO';
import { ProductService } from '../../Service/Product.Service';

export interface Review {
  image: string;
  name: string;
  title: string;
  quote: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, AfterViewInit{
  @ViewChild('reviewSlider') reviewSlider!: ElementRef; // Reference to the slider element
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;

  constructor(private productService: ProductService){}

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

  page: number = 1;
  // slider
  slides: HTMLElement [] = [];
  currentIndex: number = 0;
  intervalTime = 5000; // thời gian chuyển slide (3 giây)
  autoSlideInterval: any;
  //
  ngOnInit(): void {
    this.LoadProduct();
    //this.startSlideshow();
  }

  ngAfterViewInit() {
    // Lấy danh sách các slide sau khi view được khởi tạo
    // this.slides = Array.from(document.querySelectorAll('.slide')) as HTMLElement[];
    // this.startSlideshow();
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
}
