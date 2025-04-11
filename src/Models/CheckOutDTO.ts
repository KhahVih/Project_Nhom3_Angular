import { CartItem } from "./CartDTO";

export interface CheckOut {
    CustomerId: number | null;
    CustomerName: string;
    Email: string | null;
    Province: string | null;
    District: string | null;
    Wards: string | null;
    Address: string;
    Phone: string;
    Note: string | null;
    CartItems: CartItem [];
}