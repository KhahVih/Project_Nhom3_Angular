import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/Product.Service';
import { Product } from '../../Models/ProductDTO';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchQuery: string = '';
  constructor(private router: ActivatedRoute, private productService: ProductService){}
  products: Product [] = [];
  page: number = 1
  ngOnInit(): void {
    this.router.queryParams.subscribe(params =>{
      this.searchQuery = params['q'] || '';
      if(this.searchQuery){
        this.productService.GetProductSearch(this.searchQuery, this.page).subscribe(data =>{
          this.products = data.Products;
          console.log('Products: ',data);
        });
      }
    });
  }
}
