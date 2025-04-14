import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Service/Login.Service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-blog',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-blog.component.html',
  styleUrl: './admin-blog.component.css'
})
export class AdminBlogComponent {

  constructor( private login: LoginService, private router: Router) { }
  isMenu = true;
  openMenu() {
    this.isMenu = true;
  }
  closeMenu() {
    this.isMenu = false;
  }
  // 
  logout() {
    this.login.logout();
    this.router.navigate(['/login']);
  }
  get isAdmin(): boolean {
    return this.login.isAdmin();
  }

}
