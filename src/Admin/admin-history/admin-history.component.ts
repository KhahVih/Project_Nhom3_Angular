import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Service/Login.Service';
import { HistoryService } from '../../Service/History.Service';

@Component({
  selector: 'app-admin-history',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.css'
})
export class AdminHistoryComponent implements OnInit{
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  histories: any [] = [];
  page: number = 1;
  totalPages: number = 0;

  constructor(private login: LoginService, private router: Router, private historyService: HistoryService){}
  
  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(){
    this.historyService.getHistory(this.page).subscribe(data =>{
      this.histories = data.Histories;
      this.totalPages = data.TotalPages;
      this.updateVisiblePages(); 
      console.log('Response: ', data);
    });
  }

  visiblePages: number[] = [];
  updateVisiblePages(): void {
    const maxVisible = 5; // Số trang hiển thị tối đa
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.page - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }
  // Phân trang
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.loadHistory();
      this.updateVisiblePages()
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadHistory();
      this.updateVisiblePages()
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadHistory();
      this.updateVisiblePages()
    }
  }

  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }
  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

}
