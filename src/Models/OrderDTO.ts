import { OrderDetail } from "./OrderDetailDTO";

export interface Order {
    Id: number;
    CustomerId: number | null;
    CustomerName: string;
    Email: string | null;
    Province: string | null;
    District: string | null;
    Wards: string | null;
    Address: string;
    Phone: string;
    Note: string;
    TotalAmount: number;
    Status: string; // Tên trạng thái hiển thị (ví dụ: "Chờ xử lý")
    CreatedAt: string; // DateTime từ API sẽ được ánh xạ thành string
    OrderItems: OrderDetail [];
}