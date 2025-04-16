
import { Routes } from '@angular/router';
import { HomeComponent } from '../Website/home/home.component';
import { ProductComponent } from '../Website/product/product.component';
import { ProductdetailComponent } from '../Website/productdetail/productdetail.component';
import { CartComponent } from '../Website/cart/cart.component';
import { SearchComponent } from '../Website/search/search.component';
import { AdminHomeComponent } from '../Admin/admin-home/admin-home.component';
import { AdminContactComponent } from '../Admin/admin-contact/admin-contact.component';
import { AdminLoginComponent } from '../Admin/admin-login/admin-login.component';
import { AdminCustomerComponent } from '../Admin/admin-customer/admin-customer.component';
import { AdminOrderComponent } from '../Admin/admin-order/admin-order.component';
import { AdminCategoryComponent } from '../Admin/admin-category/admin-category.component';
import { AdminImageComponent } from '../Admin/admin-image/admin-image.component';
import { AdminCommentComponent } from '../Admin/admin-comment/admin-comment.component';
import { AdminBlogComponent } from '../Admin/admin-blog/admin-blog.component';
import { RecruitmentComponent } from '../Website/recruitment/recruitment.component';
import { PolicyComponent } from '../Website/policy/policy.component';
import { StoresystemComponent } from '../Website/storesystem/storesystem.component';
import { LoginComponent } from '../Website/login/login.component';
import { ProductsaleComponent } from '../Website/productsale/productsale.component';
import { RecruitmentDetailComponent } from '../Website/recruitment-detail/recruitment-detail.component';
import { Component } from '@angular/core';
import { PolicyDetailComponent } from '../Website/policy-detail/policy-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductdetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchComponent },
  { path: 'recruitment', component: RecruitmentComponent },
  { path: 'recruitment/:id', component: RecruitmentDetailComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'policy/:subPolicy', component: PolicyDetailComponent},
  { path: 'stores', component: StoresystemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sale', component: ProductsaleComponent },
  // Admin routes
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/contact', component: AdminContactComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/customer', component: AdminCustomerComponent },
  { path: 'admin/order', component: AdminOrderComponent },
  { path: 'admin/category', component: AdminCategoryComponent },
  { path: 'admin/image', component: AdminImageComponent },
  { path: 'admin/comment', component: AdminCommentComponent },
  { path: 'admin/blog', component: AdminBlogComponent },
  // Redirect for unmatched routes
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
