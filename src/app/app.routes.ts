import { Routes } from '@angular/router';
import { HomeComponent } from '../Website/home/home.component';
import { LayoutComponent } from '../Website/layout/layout.component';
import { ProductComponent } from '../Website/product/product.component';
import { ProductdetailComponent } from '../Website/productdetail/productdetail.component';
import { CartComponent } from '../Website/cart/cart.component';
import { SearchComponent } from '../Website/search/search.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'product', component: ProductComponent},
    {path: 'product/:id', component: ProductdetailComponent},
    {path: 'cart', component: CartComponent},
    {path: 'search', component: SearchComponent},
];
