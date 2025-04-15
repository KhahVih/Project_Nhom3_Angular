import { Component } from '@angular/core';
import { Order } from '../../Models/OrderDTO';
import { OrderService } from '../../Service/Order.Service';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-order',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css'
})
export class AdminOrderComponent {
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  order: Order [] = [];
  orderdetail: Order [] = [];
  totalOrder: number = 0;
  isOrderDeatail: boolean = false;
  selectedStatus: string = ''; // Trạng thái được chọn từ dropdown
  pendingOrders: number = 0;  // Số đơn hàng chờ xử lý
  deliveredOrders: number = 0; // Số đơn hàng đã giao
  orderStatuses = [
    { value: '0', label: 'Chờ xử lý' },
    { value: '1', label: 'Đang xử lý' },
    { value: '2', label: 'Đang giao hàng' },
    { value: '3', label: 'Đã giao hàng' },
    { value: '4', label: 'Đã hủy' }
  ]; // Danh sách trạng thái
  constructor(private orderService: OrderService, private login: LoginService, private router: Router){}

  ngOnInit(): void {
    this.loadOrder();
  }
  loadOrder(){
    this.orderService.GetAllOrders().subscribe(data =>{
      this.order = data;
      this.totalOrder = data.length;
      this.loadOrderCountByStatus();
      console.log(data);
    })
  }
  loadOrderCountByStatus(): void {
    this.orderService.GetOrderCountByStatus().subscribe({
      next: (data) => {
        this.pendingOrders = data.pendingOrders;
        this.deliveredOrders = data.deliveredOrders;
      },
    });
  }

  GetOrderDetail(Id: number){
    this.isOrderDeatail = true;
    this.orderService.GetOrderId(Id).subscribe(data =>{
      this.orderdetail = data;
      this.selectedStatus = data[0].Status
      console.log(data)
    })
  }

  UpdateStatus(Id: number){
    if (!this.selectedStatus) {
      alert('Vui lòng chọn trạng thái!');
      return;
    }
    const updateData = { status: this.selectedStatus };
    this.orderService.UpdateStatus(Id, updateData).subscribe({
      next: (reponse) => {
        alert('Đã cập nhật thành công ');
        //this.GetOrderDetail(Id);
        this.loadOrder(); // Cập nhật lại danh sách đơn hàng
        this.closedetail();

      },
      error: (error) => {
        alert(`Lỗi khi cập nhật trạng thái: ${error.message}`);
      }
    });
  }
  DeleteOrder(Id: number){
    this.orderService.DeleteOrder(Id).subscribe({
      next: (reponse) =>{
        alert("Bạn có muốn quá Hóa đơn với Id: " + Id);
        this.loadOrder();
      }
    })
  }
  closedetail(){
    this.isOrderDeatail = false;
  }

  //
  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }
  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

}
