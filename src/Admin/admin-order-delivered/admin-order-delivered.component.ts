import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Service/Login.Service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../Service/Order.Service';
import { Order } from '../../Models/OrderDTO';

@Component({
  selector: 'app-admin-order-delivered',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-order-delivered.component.html',
  styleUrl: './admin-order-delivered.component.css'
})
export class AdminOrderDeliveredComponent implements OnInit{
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  orders: Order [] = [];
  page: number = 1;
  totalPages: number = 1;
  constructor(private login: LoginService, private router: Router, private orderService: OrderService){}

  ngOnInit(): void {
    this.loadOrder()
  }
  loadOrder(){
    this.orderService.GetOrderDelivered(this.page).subscribe(data =>{
      this.orders = data.ProcessingOrders;
      this.totalPages = data.TotalPages;
      this.updateVisiblePages();
      console.log('Response: ',data);
    });
  }
  visiblePages: number[] = [];
  updateVisiblePages(): void {
    const maxVisible = 5; // Số trang hiển thị tối đa
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.page - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  // Phân trang
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.loadOrder();
      this.updateVisiblePages()
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadOrder();
      this.updateVisiblePages()
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadOrder();
      this.updateVisiblePages()
    }
  }

  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }
}
