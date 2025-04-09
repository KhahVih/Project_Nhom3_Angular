import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../Models/ProductDTO';
import { ProductService } from '../Service/Product.Service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'ChamyAngular';
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
