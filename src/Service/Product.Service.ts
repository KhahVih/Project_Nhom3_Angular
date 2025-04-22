import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/ProductDTO';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiBaseUrl = 'https://localhost:7194'; // URL base của API
  private productsUrl = `${this.apiBaseUrl}/api/Product`; // Endpoint cho products

  constructor(private http: HttpClient) { }

  // Lấy danh sách sản phẩm
  GetProducts(page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetAllProduct?page=${page}`);
  }
  // Lấy tất cả sản phẩm giảm giá 
  GetProductSale(page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetDiscountedProducts?page=${page}`)
  }
  // Lấy sản phẩm theo Id 
  GetProductId(Id: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProduct/${Id}`)
  }
  // Lấy danh sách sản phẩm theo danh mục 
  GetProductCategoryId(Id: number, page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProductCategory/${Id}?page=${page}`)
  }
  // Lấy danh sách sản phẩm đã xuất 
  GetProductIsPuslish(page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProductIsPuslish?page=${page}`)
  }
  // Lấy danh sách sản phẩm chưa xuất 
  GetProductNoPuslish(page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProductNoPuslish?page=${page}`)
  }
  // Lấy danh sách sản phẩm theo sale Id 
  GetProductSaleId(Id: number, page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProductSale/${Id}?page=${page}`)
  }
  // Lấy danh sách sản phẩm mới 
  GetProductNew(page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProductNew?page=${page}`)
  }
  // Lấy danh sách sản phẩm cũ 
  GetProductOld(page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProductOld?page=${page}`)
  }
  // Lấy danh sách sản phẩm theo giá tăng dần 
  GetProductPriceASC(page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProductPriceASC?page=${page}`)
  }
  // Lấy danh sách sản phẩm theo giá giảm dần 
  GetProductPriceASDC(page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/GetProductPriceASDC?page=${page}`)
  }
  // Tìm kiếm sản phẩm theo Name và PosCode 
  GetProductSearch(name: string, page: number): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/SearchProduct/${name}?page=${page}`)
  }
  // Thêm sản phẩm 
  AddProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, formData);
  }
  // Cập nhật sản phẩm 
  UpdateProduct(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/UpdateProduct/${id}`, formData);
  }
  // Xóa sản phẩm
  DeleteProduct(id: number): Observable<void> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError<void>('deleteProduct'))
    );
  }
  CountProduct(Id: number): Observable<any>{
    return this.http.get<any>(`https://localhost:7194/api/Order/count-sold-by-product?Id=${Id}`)
  }

  // 🎨 Lấy danh sách màu sắc
  getColor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.productsUrl}/GetColor`);
  }

  // 📏 Lấy danh sách kích thước
  getSize(): Observable<any[]> {
      return this.http.get<any[]>(`${this.productsUrl}/GetSize`);
  }
  // Xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
