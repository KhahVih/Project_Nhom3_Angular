export interface Customer{
    Id: number;
    Username: string; // Dấu ? biểu thị thuộc tính không bắt buộc (nullable)
    Email: string;
    Password: string;
    Fullname: string;
    Address: string;
    Phone: string;
    Gender: boolean;
    IsClone?: boolean;
    CreatedAt?: Date;
    Date?: Date;
    CommentCount: number;
}