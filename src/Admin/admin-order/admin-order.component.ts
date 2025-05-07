import { Component } from '@angular/core';
import { Order } from '../../Models/OrderDTO';
import { OrderService } from '../../Service/Order.Service';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { CartItem } from '../../Models/CartDTO';

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
  cartItems: CartItem [] = [];
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
      console.log(data)
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
  
  getTotalDiscountForDetail(): number {
    const order = this.orderdetail[0];
    if (!order || !order.OrderItems) {
      return 0;
    }
  
    const sumOfItems = order.OrderItems.reduce((total, item) => {
      return total + (item.UnitPrice * item.Quantity);
    }, 0);
  
    // Giảm giá = Tổng gốc - Tổng đã thanh toán
    return sumOfItems - order.TotalAmount;
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
  // Hàm chuyển file TTF thành base64
  // async getBase64Font(): Promise<string> {
  //   try {
  //     const response = await fetch('assets/fonts/times.ttf'); // Đường dẫn đến file TTF
  //     const blob = await response.blob();
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const base64data = reader.result as string;
  //         resolve(base64data);
  //       };
  //       reader.onerror = reject;
  //       reader.readAsDataURL(blob);
  //     });
  //   } catch (error) {
  //     console.error('Lỗi khi đọc file TTF:', error);
  //     throw error;
  //   }
  // }
  // xuất file
  async exportToWord(): Promise<void> {
    const order = this.orderdetail[0];
  
    // Tạo tài liệu Word
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720, // 1 inch = 720 twips
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
          children: [
            // Tiêu đề hóa đơn
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'HÓA ĐƠN MUA HÀNG',
                  bold: true,
                  size: 32, // Font size 16 (size trong docx là point * 2)
                  allCaps: true,
                }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `Mã hóa đơn: ${order.Id}`,
                  size: 24, // Font size 12
                }),
              ],
              spacing: { after: 400 },
            }),
  
            // Bảng thông tin khách hàng
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
                insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
                insideVertical: { style: BorderStyle.NONE },
              },
              rows: [
                // Tiêu đề bảng
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 100, type: WidthType.PERCENTAGE },
                      columnSpan: 2,
                      children: [
                        new Paragraph({
                          text: 'THÔNG TIN KHÁCH HÀNG',
                          
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: '16A085' }, // Màu nền tương ứng với [22, 160, 133]
                    }),
                  ],
                }),
                // Dữ liệu khách hàng
                ...[
                  ['Tên khách hàng', order.CustomerName ?? ''],
                  ['Email', order.Email ?? ''],
                  ['Tỉnh / Thành phố', order.Province ?? ''],
                  ['Quận / Huyện', order.District ?? ''],
                  ['Phường / Xã', order.Wards ?? ''],
                  ['Địa chỉ', order.Address ?? ''],
                  ['Số điện thoại', order.Phone ?? ''],
                  ['Ghi chú', order.Note ?? ''],
                  ['Ngày mua', new Date(order.CreatedAt).toLocaleString()],
                ].map(
                  ([label, value]) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 30, type: WidthType.PERCENTAGE },
                          children: [
                            new Paragraph({
                              text: label,
                              
                            }),
                          ],
                        }),
                        new TableCell({
                          width: { size: 70, type: WidthType.PERCENTAGE },
                          children: [
                            new Paragraph({
                              text: value,
                            }),
                          ],
                        }),
                      ],
                    }),
                ),
              ],
            }),
  
            // Khoảng cách giữa các bảng
            new Paragraph({
              text: '',
              spacing: { after: 400 },
            }),
  
            // Bảng danh sách sản phẩm
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
                insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
                insideVertical: { style: BorderStyle.SINGLE, size: 1 },
              },
              rows: [
                // Tiêu đề bảng
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 5, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: 'STT',
                          
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: '2980B9' }, // Màu nền tương ứng với [41, 128, 185]
                    }),
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: 'Tên sản phẩm',
                          
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: '2980B9' },
                    }),
                    new TableCell({
                      width: { size: 15, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: 'Mã PosCode',
                          
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: '2980B9' },
                    }),
                    new TableCell({
                      width: { size: 10, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: 'Số lượng',
                          
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: '2980B9' },
                    }),
                    new TableCell({
                      width: { size: 10, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: 'Size',
                         
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: '2980B9' },
                    }),
                    new TableCell({
                      width: { size: 15, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: 'Màu',
                          
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: '2980B9' },
                    }),
                    new TableCell({
                      width: { size: 20, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: 'Giá',
                          
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: '2980B9' },
                    }),
                  ],
                }),
                // Dữ liệu sản phẩm
                ...order.OrderItems.map((item, index) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 5, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            text: (index + 1).toString(),
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            text: item.ProductName ?? '',
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 15, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            text: item.ProductPosCode ?? '',
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 10, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            text: item.Quantity.toString(),
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 10, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            text: item.SizeName ?? '',
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 15, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            text: item.ColorName ?? '',
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 20, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            text: item.UnitPrice.toLocaleString() + ' VNĐ',
                            alignment: AlignmentType.RIGHT,
                          }),
                        ],
                      }),
                    ],
                  }),
                ),
              ],
            }),
  
            // Khoảng cách
            new Paragraph({
              text: '',
              spacing: { after: 400 },
            }),
  
            // Bảng tổng tiền
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE },
                insideVertical: { style: BorderStyle.NONE },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 80, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: 'Tổng tiền đơn hàng:',
                          
                          alignment: AlignmentType.RIGHT,
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 20, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          text: order.TotalAmount.toLocaleString() + ' VNĐ',
                          
                          alignment: AlignmentType.RIGHT,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
  
            // Dòng chữ cảm ơn
            new Paragraph({
              text: '',
              spacing: { after: 400 },
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'Cảm ơn quý khách đã mua hàng!',
                  italics: true,
                  size: 24, // Font size 12
                }),
              ],
            }),
          ],
        },
      ],
    });
  
    // Tạo và lưu file Word
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Hóa Đơn Mua Hàng ${order.Id}.docx`);
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
