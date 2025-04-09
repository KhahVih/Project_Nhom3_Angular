export interface Comment {
    Id: number;
    ProductId: number;
    Vote?: number | null;
    Description?: string;
    CreatedAt?: Date | null;
    CustomerId?: number | null;
    IsShow?: boolean | null;
    ProductName: string;
    CustomerName: string;
}

export interface ChangePassword {
    Email: string;
    OldPassword: string;
    NewPassword: string;
}