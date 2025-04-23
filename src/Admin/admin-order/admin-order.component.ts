import { Component } from '@angular/core';
import { Order } from '../../Models/OrderDTO';
import { OrderService } from '../../Service/Order.Service';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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
  page: number = 1;
  totalPages: number = 0;
  loadOrder(){
    this.orderService.GetAllOrders(this.page).subscribe(data =>{
      this.order = data.Orders;
      this.totalOrder = data.TotalOrders;
      this.totalPages = data.TotalPages;
      this.loadOrderCountByStatus();
      this.updateVisiblePages();
      console.log(data);
    })
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
      this.selectedStatus = data[0].Status;
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
  // xuất file excel
  exportToExcel(): void {
    const order = this.orderdetail[0]; // Vì bạn đang lặp *ngFor nhưng chỉ là 1 đơn
  
    const customerInfo = [
      ['Tên người mua', order.CustomerName],
      ['Email', order.Email],
      ['Tỉnh / Thành phố', order.Province],
      ['Quận / Huyện', order.District],
      ['Phường / Xã', order.Wards],
      ['Địa chỉ', order.Address],
      ['Số điện thoại', order.Phone],
      ['Ghi chú', order.Note],
      ['Ngày mua', new Date(order.CreatedAt).toLocaleString()]
    ];
  
    const items = order.OrderItems.map(item => ({
      'Tên sản phẩm': item.ProductName,
      'Mã PosCode': item.ProductPosCode,
      'Số lượng': item.Quantity,
      'Kích thước': item.SizeName,
      'Màu sắc': item.ColorName,
      'Giá': item.UnitPrice
    }));

    const totals = [
      ['Tổng đơn:', order.TotalAmount],
      ['Giảm giá hóa đơn:', 0],
      ['Tổng phải thanh toán:', order.TotalAmount]
    ];
  
    const ws1 = XLSX.utils.aoa_to_sheet(customerInfo);
    // Đặt độ rộng cho phần customer info (2 cột đầu tiên)
    ws1['!cols'] = [
      { wch: 40 },
      { wch: 60 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 }
    ];
    // Thêm danh sách sản phẩm vào cùng sheet (sau thông tin khách hàng)
    XLSX.utils.sheet_add_aoa(ws1, [['']], { origin: -1 }); // dòng trống
    XLSX.utils.sheet_add_aoa(ws1, [['Thông tin sản phẩm']], { origin: -1 }); 
    XLSX.utils.sheet_add_json(ws1, items, { skipHeader: false, origin: -1 });
    // Set độ rộng cho các cột sản phẩm (ghi đè lên !cols cũ)
    ws1['!cols'] = [
      { wch: 25 }, // Tên sản phẩm
      { wch: 18 }, // Mã PosCode
      { wch: 12 }, // Số lượng  
      { wch: 14 }, // Kích thước
      { wch: 14 }, // Màu sắc
      { wch: 12 }  // Giá
    ];
    // Thêm tổng hóa đơn
    XLSX.utils.sheet_add_aoa(ws1, [['']], { origin: -1 }); // dòng trống
    XLSX.utils.sheet_add_aoa(ws1, [['Tổng hóa đơn']], { origin: -1 }); 
    XLSX.utils.sheet_add_aoa(ws1, totals, { origin: -1 });
    // 👇 Set chiều rộng từng cột (width tính theo ký tự)
  
    const wb: XLSX.WorkBook = { 
      Sheets: { 'ChiTietDonHang': ws1 },
      SheetNames: ['ChiTietDonHang']
    };
  
    // Gộp các phần vào cùng 1 sheet
    // XLSX.utils.sheet_add_json(ws1, items, { origin: -1 });
    // XLSX.utils.sheet_add_aoa(ws1, [['']], { origin: -1 });
    // XLSX.utils.sheet_add_aoa(ws1, totals, { origin: -1 });
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, `ChiTietDonHang_${order.Id}.xlsx`);
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
