import { Color } from "./ColorDTO";
import { Comment } from "./CommentDTO";
import { Image } from "./ImageDTO";
import { ProductCategory } from "./ProductCategoryDTO";
import { Size } from "./SizeDTO";

export interface Product {
    Id: number;
    PosCode: string;
    Name: string;
    Description: string;
    CreatedAt: Date; // DateTime từ API trả về dạng chuỗi ISO
    UpdatedAt: Date; // DateTime từ API trả về dạng chuỗi ISO
    Price: number;
    IsPublish: boolean;
    IsNew: boolean;
    Count: number;
    SaleId?: number;
    Sale?: number;
    SaleName?: string;
    DiscountPercentage?: number;
    Images: Image [];
    ProductCategorys: ProductCategory [];
    Comments: Comment [];
    Colors: Color [];
    Sizes: Size [];
}
