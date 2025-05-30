export interface CartItem {
    Id: number;
    CustomerId: number | null;
    ProductId: number;
    ProductName: string; 
    ProductImage?: string;
    Quantity: number;
    ColorId?: number | null;
    ColorName?: string
    SizeId?: number;
    SizeName?: string
    UnitPrice: number;
    FinalPrice: number;
}
