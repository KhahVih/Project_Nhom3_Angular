import { Component } from '@angular/core';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  constructor(private login: LoginService, private router: Router){}
  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }
  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

}
