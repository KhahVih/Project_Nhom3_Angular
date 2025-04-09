export interface OrderDetail {
    Id: number;
    ProductId: number;
    ProductName: string;
    ProductPosCode: string;
    Quantity: number;
    UnitPrice: number;
    ColorId: number | null;
    ColorName: string | null;
    SizeId: number | null;
    SizeName: string | null;
}